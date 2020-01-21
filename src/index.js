import 'dotenv/config'

import express, { urlencoded, json } from 'express'
import morgan from 'morgan'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import rateLimit from 'express-rate-limit'
import listEndpoints from 'express-list-endpoints'
import { indexRouter } from './routes/index.router'
import { handleErrors } from './middlewares'
import winston from './config/winston'
import { checkAquarius, checkBrizo } from './models/checkOcean'
import { initializeOceanNetwork, provider } from './models/initializeOcean'
import swaggerConfig from './config/swagger-base'

/* -----------------------------------
    Instantiate the Ocean connection
  ----------------------------------- */

winston.info('Instantiating Ocean Squid library')

const globaloptions = {
  enablepublish: process.env.enable_publish === 'true' || false,
  enableconsume: process.env.enable_consume === 'true' || false
}

let ocean
;(async () => {
  ocean = await initializeOceanNetwork()
  // Check connections
  checkAquarius(ocean.aquarius.url)
  checkBrizo(ocean.brizo.url)
})().catch(err => {
  console.log('Failed to connect to Ocean network', err)
  process.exit()
})

/* -----------------------------------
    Build the Express app + middleware
  ----------------------------------- */

winston.info('Building Express application')

const app = express()

// Logging with morgan and winston
app.use(morgan('combined', { stream: winston.stream }))

// parse application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }))

// app.use(expressWinston.logger({
//       transports: [
//         new winston.transports.Console()
//       ],
//       format: winston.format.combine(
//         winston.format.colorize(),
//         winston.format.json()
//       ),
//       meta: true, // optional: control whether you want to log the meta data about the request (default to true)
//       msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
//       expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
//       colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
//       ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
//     }));

// parse application/json
app.use(json())

// configure CORS headers
app.use((req, res, next) => {
  res.locals.ocean = ocean
  res.locals.provider = provider
  res.locals.globaloptions = globaloptions
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  next()
})

/* -----------------------------------
    Swagger setup
  ----------------------------------- */
const specs = swaggerJsdoc(swaggerConfig)
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }))
app.get('/spec', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(specs)
})

/* -----------------------------------
    Routes
  ----------------------------------- */

winston.info('Building routes')

app.use('/api', indexRouter)
app.use(handleErrors)

// rate limits
const apiLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 15
})

// only apply to requests that begin with /api/
app.use('/network/publish', apiLimiter)
app.use('/network/publishddo', apiLimiter)

console.log(listEndpoints(app))

// handle errors
app.use(handleErrors)

/* -----------------------------------
    Start the server
  ----------------------------------- */

winston.info('Starting server')

app
  .listen(process.env.PORT || 4040, () => {
    winston.info(`Server started on Port ${process.env.PORT || 4040}`)
  })
  .on('error', console.log)


import express, { urlencoded, json } from "express";
import { networkRouter, generalapis, indexRouter } from "./routes/index.router";
import { handleErrors } from "./middlewares";
var winston = require('./config/winston');
var expressWinston = require('express-winston');
const morgan = require('morgan');
const rateLimit = require("express-rate-limit");
import { checkAquarius, checkBrizo } from "./models/checkOcean"
import { initializeOceanNetwork, provider } from "./models/initializeOcean"
// import { exitOnError } from "winston";
require('dotenv').load();
// const util = require('util')
const listEndpoints = require('express-list-endpoints')
var expressWinston = require('express-winston');

/*-----------------------------------
    Instantiate the Ocean connection
  -----------------------------------*/
winston.info("Instantiating Ocean Squid library")
var ocean;
(async () => {
  ocean = await initializeOceanNetwork();
  // Check connections
  checkAquarius(ocean.aquarius.url);
  checkBrizo(ocean.brizo.url);

})().catch(err => {
  console.log("Failed to connect to Ocean network", err);
  process.exit();
});

/*-----------------------------------
    Build the Express app + middleware
  -----------------------------------*/
winston.info("Building Express application")
const app = express();

// Logging with morgan and winston
app.use(morgan('combined', { stream: winston.stream }));

// parse application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));

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
app.use(json());

// configure CORS headers
app.use((req, res, next) => {
  res.locals.ocean = ocean;
  res.locals.provider = provider;
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

/*-----------------------------------
    Routes
  -----------------------------------*/
winston.info("Building routes")
app.use("/api", indexRouter);
app.use(handleErrors);

//rate limits
const apiLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 15
});

// only apply to requests that begin with /api/
app.use("/network/publish", apiLimiter);
app.use("/network/publishddo", apiLimiter);

console.log(listEndpoints(app));

/*-----------------------------------
    Start the server
  -----------------------------------*/
winston.info("Starting server")
const server = app.listen(process.env.PORT || 4040, () => {
  winston.info(`Server started on Port ${process.env.PORT || 4040}`);
}).on('error', console.log);

import express, { urlencoded, json } from "express";
import { networkRouter, generalapis } from "./routes";
import { handleErrors } from "./middlewares";
// import { winston_logger } from "./middlewares";
var winston = require('./config/winston');
const morgan = require('morgan');
const rateLimit = require("express-rate-limit");
var request = require('request');
import { initializeOceanNetwork, provider } from "./init_ocean"
import { exitOnError } from "winston";
require('dotenv').load();
const util = require('util')

/*-----------------------------------
    Instantiate the Ocean connection 
  -----------------------------------*/
winston.info("Instantiating Ocean Squid library")
var ocean;
(async () => {
  ocean = await initializeOceanNetwork();
  //console.log(ocean);    
})().catch(e => {
  console.log("Failed to connect to Ocean network", e);
  // Deal with the fact the chain failed
});

// console.log(util.inspect(ocean, {showHidden: false, depth: null}))
// console.log(JSON.stringify(ocean, null, 4));

// ocean.brizo.url
// ocean.keeper.connected == true

var r = request.get(ocean.aquarius.url, function (err, res, body) {
  console.log(body);
})

// console.log('OK1');
// console.log('OK');
// request.get(ocean.aquarius.url, function (err, res, body) {
//   console.error('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.  })
// });

/*-----------------------------------
    Build the Express app + middleware
  -----------------------------------*/
winston.info("Building Express application")
const app = express();

// Logging with morgan and winston
// app.use(morgan('dev'));
app.use(morgan('combined', { stream: winston.stream }));
// app.use(winston_logger);

// parse application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));

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
app.use("/network", networkRouter);
app.use("/", generalapis);
app.use(handleErrors);

//rate limits
const apiLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 15
});

// only apply to requests that begin with /api/
app.use("/network/publish", apiLimiter);
app.use("/network/publishddo", apiLimiter);

/*-----------------------------------
    Start the server
  -----------------------------------*/
winston.info("Starting server")
const server = app.listen(process.env.PORT || 4040, () => {
  winston.info(`Server started on Port ${process.env.PORT || 4040}`);
}).on('error', console.log);


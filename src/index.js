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
  // Assert Aquarius connection
  request.get(ocean.aquarius.url, function (err, res, body) {
    try {
      if (err) {
        console.error(`Can't connect to Aquarius at ${ocean.aquarius.url}`);
        process.exit()
      }

      if (res.statusCode != 200) {
        console.error(`Can't connect to Aquarius at ${ocean.aquarius.url}`);
        process.exit()
      }

      var status = JSON.parse(body);
      if (!status.hasOwnProperty('version')) {
        console.error(`Improper status endpoint on ${ocean.aquarius.url}`);
        process.exit()
      }
      winston.info(`Ocean connected to Aquarius ${status.version}`);
    }
    catch (error) {
      console.error(error);
      process.exit();
    }
  });

  // Assert Brizo connection
  request.get(ocean.brizo.url, function (err, res, body) {
    try {
      if (err) {
        console.log(`Can't connect to Brizo at ${ocean.brizo.url}`);
        process.exit()
      }

      if (res.statusCode != 200) {
        console.error(`Can't connect to Brizo at ${ocean.brizo.url}`);
        process.exit()
      }

      var status = JSON.parse(body);
      if (!status.hasOwnProperty('version')) {
        console.error(`Improper status endpoint on ${ocean.brizo.url}`);
        process.exit()
      }
      winston.info(`Ocean connected to Brizo ${status.version}`);
    }
    catch (error) {
      console.error(error);
      process.exit();
    }
  });

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


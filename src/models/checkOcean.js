var winston = require('./../config/winston');
var request = require('request');


export function checkAquarius(aquariusUrl) {
  request.get(aquariusUrl, function (err, res, body) {
    try {
      if (err) {
        console.error(`Can't connect to Aquarius at ${aquariusUrl}`);
        process.exit()
      }

      if (res.statusCode != 200) {
        console.error(`Can't connect to Aquarius at ${aquariusUrl}`);
        process.exit()
      }

      var status = JSON.parse(body);
      if (!status.hasOwnProperty('version')) {
        console.error(`Improper status endpoint on ${aquariusUrl}`);
        process.exit()
      }
      winston.info(`Ocean connected to Aquarius ${status.version}`);
    }
    catch (error) {
      console.error(error);
      process.exit();
    }
  });
}

export function checkBrizo(brizoUrl) {
  request.get(brizoUrl, function (err, res, body) {
    try {
      if (err) {
        console.log(`Can't connect to Brizo at ${brizoUrl}`);
        process.exit()
      }

      if (res.statusCode != 200) {
        console.error(`Can't connect to Brizo at ${brizoUrl}`);
        process.exit()
      }

      var status = JSON.parse(body);
      if (!status.hasOwnProperty('version')) {
        console.error(`Improper status endpoint on ${brizoUrl}`);
        process.exit()
      }
      winston.info(`Ocean connected to Brizo ${status.version}`);
    }
    catch (error) {
      console.error(error);
      process.exit();
    }
  });
}
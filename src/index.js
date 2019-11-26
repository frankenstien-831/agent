import express, { urlencoded, json } from "express";
import { networkRouter,generalapis } from "./routes";
import { handleErrors, winston_logger } from "./middlewares";
const morgan = require('morgan');
import { Ocean, Logger } from '@oceanprotocol/squid'
const rateLimit = require("express-rate-limit");
require('dotenv').load();
var ocean;

var HDWalletProvider = require("truffle-hdwallet-provider");
//var mnemonic = "axis talent grab cushion figure couple plug ostrich file false jealous nest"; // 12 word mnemonic
var provider = new HDWalletProvider(process.env.PRIVATE_KEY, process.env.nodeUri);



import Web3 from 'web3';

const web3 = new Web3(process.env.nodeUri);

async function initializeOceanNetwork() {
 
  try {
    const _ocean = await Ocean.getInstance({
	web3Provider: provider,
    // the node of the blockchain to connect to, could also be infura
    nodeUri: process.env.nodeUri,
	// the uri of aquarius
    aquariusUri: process.env.aquariusUri,
	// the uri of brizo
    brizoUri: process.env.brizoUri,
	// address that brizo uses
    brizoAddress: process.env.brizoAddress,
    // the uri to the parity node you want to use for encryption and decryption
    parityUri: process.env.parityUri,
    // the uri of the secret store that holds the keys
    secretStoreUri: process.env.secretstoreUri
	
	})
	return(_ocean);
  } catch (error) {
    console.error(error);
    return null;
  }
}



(async () => {
    ocean = await initializeOceanNetwork();
	//console.log(ocean);    
})().catch(e => {
    // Deal with the fact the chain failed
});

const app = express();

// Logging
app.use(morgan('dev'));
// app.use(winston_logger);

// parse application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));

// parse application/json
app.use(json());

// configure CORS headers
app.use((req, res, next) => {
   res.locals.ocean=ocean;
    res.locals.provider=provider;
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

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


//start express server
const server = app.listen(process.env.PORT || 4040, () => {
  console.log(`Server started on Port ${process.env.PORT || 4040}`);
});


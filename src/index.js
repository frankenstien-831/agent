import express, { urlencoded, json } from "express";
import { networkRouter,generalapis } from "./routes";
import { handleErrors } from "./middlewares/errorHandler";
import { Ocean, Logger } from '@oceanprotocol/squid'
var ocean;


async function initializeOceanNetwork() {
 
  try {
    const _ocean = await Ocean.getInstance({
    // the node of the blockchain to connect to, could also be infura
    //nodeUri: process.env.nodeUri || 'http://localhost:8545',
	nodeUri: process.env.nodeUri || 'https://pacific.oceanprotocol.com',
    // the uri of aquarius
    //aquariusUri: process.env.aquariusUri || 'http://localhost:5000',
	aquariusUri: process.env.aquariusUri || 'https://aquarius.commons.oceanprotocol.com',
    // the uri of brizo
    //brizoUri: process.env.brizoUri || 'http://localhost:8030',
	brizoUri: process.env.brizoUri || 'https://brizo.commons.oceanprotocol.com',
    // address that brizo uses
    brizoAddress: process.env.brizoAddress || '0x00bd138abd70e2f00903268f3db08f2d25677c9e',
    // the uri to the parity node you want to use for encryption and decryption
//    parityUri: process.env.parityUri || 'http://localhost:9545',
	parityUri: process.env.parityUri || 'https://pacific.oceanprotocol.com',
    // the uri of the secret store that holds the keys
    //secretStoreUri: process.env.secretstoreUri || 'http://localhost:12001'
secretStoreUri: process.env.secretstoreUri || 'https://secret-store.oceanprotocol.com/'
	
	})
	return(_ocean);
  } catch (error) {
    console.error(error);
    return null;
  }
}


(async () => {
    ocean = await initializeOceanNetwork();
    
})().catch(e => {
    // Deal with the fact the chain failed
});
const app = express();

// parse application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));

// parse application/json
app.use(json());

// configure CORS headers
app.use((req, res, next) => {
   res.locals.ocean=ocean;
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

//start express server
const server = app.listen(process.env.PORT || 4040, () => {
  console.log(`Server started on Port ${process.env.PORT || 4040}`);
});


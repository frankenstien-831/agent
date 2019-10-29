//initializes a new Ocean network for a given config
export async function initializeOceanNetwork(config) {
  let { Ocean } = require("@oceanprotocol/squid");

  try {
    const _ocean = await Ocean.getInstance(config);
    //console.log(JSON.stringify(_ocean));
    return _ocean;
  } catch (error) {
    console.error(error);
    return Error(error.message);
  }
}

import { Ocean } from '@oceanprotocol/squid'
import HDWalletProvider from '@truffle/hdwallet-provider'
// const mnemonic = "axis talent grab cushion figure couple plug ostrich file false jealous nest"; // 12 word mnemonic
const provider = new HDWalletProvider(
  process.env.PRIVATE_KEY,
  process.env.nodeUri
)

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
    return _ocean
  } catch (error) {
    console.error(error)
    return null
  }
}

export { initializeOceanNetwork, provider }

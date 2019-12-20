import express from 'express'
import request from 'request'

const router = express.Router()

// POST request to register new network
router.get(
  '/aquarius/status',

  async (req, res, next) => {
    const networkname = await res.locals.ocean.aquarius.getVersionInfo()
    res.status(200).json(networkname)
  }
)

router.get(
  '/brizo/status',

  async (req, res, next) => {
    const networkname = await res.locals.ocean.brizo.getVersionInfo()
    res.status(200).json(networkname)
  }
)

router.get(
  '/gas/status',

  async (req, res, next) => {
    const accounts = await res.locals.ocean.accounts.list()
    var ret = Object()
    ret.address = accounts[0].id
    try {
      await accounts[0]._web3.eth.getBalance(ret.address).then(it => {
        ret.balance = accounts[0]._web3.utils.fromWei(it)
        if (ret.balance < 1) {
          // get some gas
          try {
            if (
              process.env.faucetUri == null ||
              process.env.faucetUri === undefined
            ) {
              console.log('No faucetUri')
            } else {
              console.log('let me get some gas')
              var headersOpt = {
                'content-type': 'application/json'
              }
              request(
                {
                  method: 'post',
                  url: process.env.faucetUri + '/faucet',
                  form: { address: accounts[0].id, agent: 'agent' },
                  headers: headersOpt,
                  json: true
                },
                function(error, response, body) {
                  // Print the Response
                  console.log(error)
                  console.log(body)
                }
              )
            }
          } catch (err) {
            console.log(err)
          }
        }
      })
    } catch (err) {
      console.log(err)
    }

    res.status(200).json(ret)
  }
)

// export default router;
exports.router = router

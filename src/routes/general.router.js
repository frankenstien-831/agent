import express from 'express'
import AssetModel from '../models/asset'

const router = express.Router()

// POST request to register new network
router.post(
  '/publishddo',

  async (req, res, next) => {
    console.log('Started publish')
    const accounts = await res.locals.ocean.accounts.list()
    // console.log(req.body.metadata);
    // const { typeofgdpr, gdprcomply, havecopyright, publisher } = req.body

    let result

    try {
      const ddo = await res.locals.ocean.assets.create(
        req.body.metadata,
        accounts[0]
      )
      console.log(ddo)
      result = ddo.id
    } catch (error) {
      console.error(error)
      result = null
    }
    res.status(200).json(result)
  }
)

router.post(
  '/publish',

  async (req, res, next) => {
    console.log('Started publish')
    const accounts = await res.locals.ocean.accounts.list()
    let result

    // console.log(req.body.metadata);
    const {
      name,
      author,
      license,
      files,
      price,
      type,
      description,
      copyrightHolder,
      categories
    } = req.body

    try {
      const newAsset = {
        // OEP-08 Attributes
        // https://github.com/oceanprotocol/OEPs/tree/master/8
        main: {
          ...AssetModel.main,
          name,
          dateCreated: new Date().toISOString().split('.')[0] + 'Z', // remove milliseconds
          author,
          license,
          files,
          price,
          type
        },
        additionalAttributes: {
          ...AssetModel.additionalAttributes,
          description,
          copyrightHolder,
          categories: [categories]
        }
      }

      const asset = await res.locals.ocean.assets.create(newAsset, accounts[0])
      result = asset.id
    } catch (error) {
      console.error(error)
      result = null
    }
    res.status(200).json(result)
  }
)

router.get('/searchquery', async (req, res, next) => {
  res.status(301).json('Refactored to /assets')
})

router.get('/searchtext', async (req, res, next) => {
  res.status(301).json('Refactored to /assets')
})

router.get('/resolve', async (req, res, next) => {
  res.status(301).json('Refactored to /assets')
})

// export default router;

exports.router = router

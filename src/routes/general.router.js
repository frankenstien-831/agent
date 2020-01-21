import express from 'express'
// import AssetModel from '../models/asset'

const router = express.Router()

/**
 * @swagger
 * /general/publishddo:
 *   post:
 *     summary: Publish assets in DDO format to Ocean Protocol
 *     description: This endpoint allows to publish assets into Ocean Protocol in DDO format
 *     consumes:
 *       — application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *     responses:
 *       200:
 *         description: Published successfully
 *       405:
 *         description: Publishing is not allowed
 *       500:
 *         description: Some error occured
 */
router.post(
  '/publishddo',

  async (req, res, next) => {
    try {
      console.log('Started publish')
      if (res.locals.globaloptions.enablepublish) {
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
      } else {
        res.status(405).json('Publishing is not allowed.')
      }
    } catch (error) {
      next(new Error(error))
    }
  }
)

/**
 * @swagger
 * /general/publish:
 *   post:
 *     summary: Publish assets into Ocean Protocol
 *     description: This endpoint allows to publish assets into Ocean Protocol
 *     consumes:
 *       — application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *     responses:
 *       200:
 *         description: Published successfully
 *       405:
 *         description: Publishing is not allowed
 *       500:
 *         description: Some error occured
 */
router.post(
  '/publish',

  async (req, res, next) => {
    try {
      console.log('Started publish')
      if (res.locals.globaloptions.enablepublish) {
        const accounts = await res.locals.ocean.accounts.list()
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

        const newAsset = {
          // OEP-08 Attributes
          // https://github.com/oceanprotocol/OEPs/tree/master/8
          main: {
            type,
            name: name,
            dateCreated: new Date().toISOString().split('.')[0] + 'Z', // remove milliseconds,
            author: author,
            license: license,
            price: price,
            files: files
          },
          additionalAttributes: {
            description: description,
            copyrightHolder: copyrightHolder,
            categories: [categories]
          }
        }

        const asset = await res.locals.ocean.assets.create(
          newAsset,
          accounts[0]
        )
        const result = asset.id
        // throw is did is not returned
        if (!result) {
          throw new Error('unable to publish')
        }
        res.status(200).json(result)
      } else {
        res.status(405).json('Publishing is not allowed.')
      }
    } catch (error) {
      next(new Error(error))
    }
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

import express from 'express'
const assetsController = require('../controllers/assets.controller')

const router = express.Router()

router.get('/', async (req, res) => {
  return res.status(501).send('Not implemented.')
})

/* /assets/create
   Returns: Asset object (encapsulates the DDO document)
 */
router.post('/create', async (req, res) => {
  return res.status(501).send('Not implemented.')
})

/**
 * @swagger
 * /assets/resolve:
 *   get:
 *     summary: Resolves given did to ddo
 *     description: This endpoint returns ddo for a given did
 *     consumes:
 *       — application/json
 *     parameters:
 *       - name: did
 *         in: query
 *         required: true
 *     responses:
 *       200:
 *         description: DID resolved successfully to DDO
 *       500:
 *         description: Some error occured
 */
router.get('/resolve', async (req, res, next) => {
  try {
    const results = await res.locals.ocean.aquarius.retrieveDDO(req.query.did)
    res.status(200).json(results)
  } catch (error) {
    next(new Error(error))
  }
})

router.get('/search', async (req, res) => {
  return res.status(501).send('Not implemented.')
})

router.get('/query', async (req, res) => {
  return res.status(501).send('Not implemented.')
})

router.get('/order', async (req, res) => {
  return res.status(501).send('Not implemented.')
})

/**
 * @swagger
 * /assets/consume:
 *   get:
 *     summary: Download assets from Ocean Protocol
 *     description: This endpoint allows to download assets from Ocean Protocol
 *     consumes:
 *       — application/json
 *     parameters:
 *       - name: did
 *         in: query
 *         required: true
 *     responses:
 *       200:
 *         description: Consume started
 *       405:
 *         description: Consuming is not allowed
 *       500:
 *         description: Some error occured
 */
router.get('/consume', async (req, res, next) => {
  try {
    if (res.locals.globaloptions.enableconsume) {
      const responseObj = await assetsController.GET_consume(req, res)
      console.log('Files consumed')
      res.status(200).json(responseObj)
    } else {
      res.status(405).json('Consuming is not allowed.')
    }
  } catch (error) {
    next(new Error(error))
  }
})

router.get('/validate', async (req, res) => {
  return res.status(501).send('Not implemented.')
})

router.get('/owner', async (req, res) => {
  return res.status(501).send('Not implemented.')
})

router.get('/ownerAssets', async (req, res) => {
  return res.status(501).send('Not implemented.')
})

router.get('/consumerAssets', async (req, res) => {
  return res.status(501).send('Not implemented.')
})

/**
 * @swagger
 * /assets/searchtext:
 *   get:
 *     summary: Search assets by text in Ocean Protocol
 *     description: This endpoint allows to search assets by text from Ocean Protocol
 *     consumes:
 *       — application/json
 *     parameters:
 *       - name: text
 *         in: query
 *         required: true
 *     responses:
 *       200:
 *         description: Searched successfully
 *       500:
 *         description: Some error occured
 */
router.get('/searchtext', async (req, res, next) => {
  try {
    const searchResult = await assetsController.GET_searchtext(
      req,
      res,
      req.query.text
    )
    res.status(200).json(searchResult)
  } catch (error) {
    next(new Error(error))
  }
})

/**
 * @swagger
 * /assets/samplemetadata:
 *   get:
 *     summary: Get sample metadata
 *     description: This endpoint retrieves sample metadata
 *     consumes:
 *       — application/json
 *     responses:
 *       200:
 *         description: Metadata retrieved successfully
 */
router.get('/samplemetadata', async (req, res, next) => {
  try {
    const sampleMetadata = assetsController.GET_sampleMetadata()
    res.status(200).json(sampleMetadata)
  } catch (error) {
    next(new Error(error))
  }
})

exports.router = router

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

router.get('/resolve', async (req, res, next) => {
  const results = await res.locals.ocean.aquarius.retrieveDDO(req.query.did)
  res.status(200).json(results)
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

router.get('/consume', async (req, res, next) => {
  const responseObj = await assetsController.GET_consume(req, res)

  console.log('Files consumed')
  res.status(200).json(responseObj)
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

router.get('/searchtext', async (req, res, next) => {
  const searchResult = await assetsController.GET_searchtext(
    req,
    res,
    req.query.text
  )
  res.status(200).json(searchResult)
})

router.get('/samplemetadata', async (req, res, next) => {
  const sampleMetadata = assetsController.GET_sampleMetadata()
  res.status(200).json(sampleMetadata)
})

exports.router = router

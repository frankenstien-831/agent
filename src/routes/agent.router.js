import express from 'express'
const assetsController = require('../controllers/assets.controller')

const router = express.Router()

router.get('/samplemetadata', async (req, res, next) => {
  const sampleMetadata = assetsController.GET_sampleMetadata()
  res.status(200).json(sampleMetadata)
})

exports.router = router
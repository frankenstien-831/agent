import express from 'express'

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

// export default router;
exports.router = router
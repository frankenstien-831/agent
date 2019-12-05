// import networkRouter from './network.router'
// import generalapis from './general.router'
import express from 'express'

const indexRouter = express.Router()

indexRouter.use('/assets', require('./assets.router.js').router)
indexRouter.use('/agent', require('./agent.router.js').router)
indexRouter.use('/network', require('./network.router').router)
indexRouter.use('/general', require('./general.router').router)

export { indexRouter }

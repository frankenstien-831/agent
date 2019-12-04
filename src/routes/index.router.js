import networkRouter from "./networkRouter";
import generalapis from "./generalapis";
import express from "express";

const indexRouter = express.Router()

indexRouter.use('/assets', require('./assets.router.js').router);
indexRouter.use('/network', require('./networkRouter').router);
indexRouter.use('/general', require('./generalapis').router);


export { indexRouter };
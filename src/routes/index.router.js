import networkRouter from "./networkRouter";
import generalapis from "./generalapis";
import express from "express";

const router = express.Router()

router.use('/assets', require('./assets.router.js').assetsRouter);


export { networkRouter, generalapis, router};
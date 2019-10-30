import express from "express";
import validate from "../middlewares/validator";

const router = express.Router();

// POST request to register new network
router.post(
  "/publish",
  
  async (req, res, next) => {
	res.status(200).json(true);
 }   
);

router.get(
  "/searchtext",
  async (req, res, next) => {
	res.status(200).json(true);
 }   
);
router.get(
  "/searchquery",
  async (req, res, next) => {
	const query = {
            offset: 100,
            page: 1,
            query: {
                value: 1
            },
            sort: {
                value: 1
            },
            text: req.query.text
    }
	var results=await res.locals.ocean.aquarius.queryMetadataByText(query); 
	res.status(200).json(results);
 }   
);
router.get(
  "/resolve",
  async (req, res, next) => {
	var results=await res.locals.ocean.aquarius.retrieveDDO(req.query.did); 
	res.status(200).json(results);
	
 }   
);

router.post(
  "/consume",
  async (req, res, next) => {
	res.status(200).json(true);
 }   
);


export default router;

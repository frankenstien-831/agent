import express from "express";
import validate from "../middlewares/validator";

const router = express.Router();

// POST request to register new network
router.post(
  "/publish",
  
  async (req, res, next) => {
	console.log("Started publish");
	 const accounts = await res.locals.ocean.accounts.list()
	console.log(req.body.metadata);
	var typeofgdpr =req.body.typeofgdpr;
	var gdprcomply = req.body.gdprcomply;
	var havecopyright = req.body.havecopyright;
	var result;
	var publisher=req.body.publisher;
	
	if(res.locals.provider.utils.isAddress(publisher)!=true){
		res.status(200).json(null);
	}
	else{
		try{
     		const ddo = await res.locals.ocean.assets.create(req.body.metadata, accounts[0])
      		result=ddo.id;
		}
		catch(error){
			result=null;
		}
	 // console.log(req)
		res.status(200).json(result);
	}
 }   
);

router.get(
  "/searchquery",
  async (req, res, next) => {
	res.status(200).json(true);
 }   
);
router.get(
  "/searchtext",
  async (req, res, next) => {
	const query = {
            offset: req.query.offset || 1,
            page: req.query.page || 1,
            query: {
                value: 1
            },
            sort: {
                value: req.query.sort || 1
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

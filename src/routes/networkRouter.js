import express from "express";
import validate from "../middlewares/validator";

const router = express.Router();

// POST request to register new network
router.post(
  "/aquarius/status",
  
  async (req, res, next) => {
	
	var networkname=await res.locals.ocean.aquarius.getVersionInfo(); 
	
	res.status(201).json(networkname);
 }   
);


router.post(
  "/brizo/status",
  
  async (req, res, next) => {
	var networkname=await res.locals.ocean.brizo.getVersionInfo(); 
	
	res.status(201).json(networkname);
 }   
);


export default router;

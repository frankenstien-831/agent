import express from "express";
import validate from "../middlewares/validator";
import fetch, { BodyInit, RequestInit, Response } from 'node-fetch'
var b64enc=require("base64-arraybuffer");
var sample_metadata=require("../schemas/sample_metadata.js");

const router = express.Router();



//copyed from https://github.com/oceanprotocol/squid-js/blob/8734e8f42d43d9bd31d08f5bc4104d31a63cb3e0/src/utils/ConversionTypeHelpers.ts 



function zeroXTransformer(input,zeroOutput) {
    const { valid, output } = inputMatch(
        input,
        /^(?:0x)*([a-f0-9]+)$/i,
        'zeroXTransformer'
    )
    return (zeroOutput && valid ? '0x' : '') + output
}

const noZeroX = (input) => zeroXTransformer(input, false)
function inputMatch(
    input,regexp,   conversorName) {
    if (typeof input !== 'string') {
        LoggerInstance.debug('Not input string:')
        LoggerInstance.debug(input)
        throw new Error(
            `[${conversorName}] Expected string, input type: ${typeof input}`
        )
    }
    const match = input.match(regexp)
    if (!match) {
        LoggerInstance.warn(`[${conversorName}] Input transformation failed.`)
        return { valid: false, output: input }
    }
    return { valid: true, output: match[1] }
}

//end copy

// POST request to register new network
router.post(
  "/publishddo",
  
  async (req, res, next) => {
	console.log("Started publish");
	 const accounts = await res.locals.ocean.accounts.list()
	//console.log(req.body.metadata);
	var typeofgdpr =req.body.typeofgdpr;
	var gdprcomply = req.body.gdprcomply;
	var havecopyright = req.body.havecopyright;
	var result;
	var publisher=req.body.publisher;
	try{
    	var ddo = await res.locals.ocean.assets.create(req.body.metadata, accounts[0])
		console.log(ddo)
    	result=ddo.id;
	}
	catch(error){
		console.error(error);
		result=null;
	}
	res.status(200).json(result);
	
 }   
);


router.post(
  "/publish",
  
  async (req, res, next) => {
	console.log("Started publish");
	 const accounts = await res.locals.ocean.accounts.list()
	var result;
	//console.log(req.body.metadata);
	const AssetModel = {
    assetId: null,
    publisherId: null,

    // OEP-08 Attributes
    // https://github.com/oceanprotocol/OEPs/tree/master/8
    base: {
        name: null,
        description: null,
        dateCreated: null,
        author: null,
        type: '',
        license: null,
        copyrightHolder: null,
        workExample: '',
        files: [],
        categories: [],
        links: [],
        inLanguage: '',
        tags: [],
        price: ''
    }
}

try {
	const newAsset = {
            // OEP-08 Attributes
            // https://github.com/oceanprotocol/OEPs/tree/master/8
            base: Object.assign(AssetModel.base, {
                name: req.body.name,
                description: req.body.description,
                dateCreated:
                    new Date()
                        .toISOString()
                        .split('.')[0] + 'Z', // remove milliseconds
                author: req.body.author,
                license: req.body.license,
                copyrightHolder: req.body.copyrightHolder,
                files: req.body.files,
                price: req.body.price,
                type: req.body.type,
                categories: [req.body.categories]
            })
        }

        
            const asset = await res.locals.ocean.assets.create(newAsset, accounts[0])
                result=asset.id;
	}
	catch(error){
		console.error(error);
		result=null;
	}
	res.status(200).json(result);
	
 }   
);



router.get(
  "/searchquery",
  async (req, res, next) => {
	res.status(200).json(true);
 }   
);


router.get(
  "/samplemetadata",
  async (req, res, next) => {
	res.status(200).json(sample_metadata.sample_metadata);
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
	var responseObj=Array();
	const accounts = await res.locals.ocean.accounts.list()
	var did =req.body.did;
	const consumeAsset = await res.locals.ocean.assets.resolve(did);
	const service = consumeAsset.findServiceByType('Access')
	const agreementId = await res.locals.ocean.assets.order(
        consumeAsset.id,
        service.serviceDefinitionId,
        accounts[0]
      )
	var index=-1;
	var consumerAccount=accounts[0]
	var resultPath='./downloads/';
	 var useSecretStore=0;
		const ddo = consumeAsset;
        const { metadata } = ddo.findServiceByType('Metadata')

        const accessService = ddo.findServiceById(service.serviceDefinitionId)

        const { files } = metadata.base

        const { serviceEndpoint } = accessService

        if (!serviceEndpoint) {
            throw new Error(
                'Consume asset failed, service definition is missing the `serviceEndpoint`.'
            )
        }
			const signature =
            (await consumerAccount.getToken()) ||
            (await res.locals.ocean.utils.signature.signText(
                noZeroX(agreementId),
                consumerAccount.getId()
            ))

			 for (const fileitem of files) {
				
				var newfile=new Object();
					newfile.ContentType=fileitem.ContentType;
				newfile.index=fileitem.index;
				newfile.contentLength=fileitem.contentLength;
				newfile.compression=fileitem.compression;
                let consumeUrl = serviceEndpoint
                consumeUrl += `?index=${fileitem.index}`
                consumeUrl += `&serviceAgreementId=${noZeroX(agreementId)}`
                consumeUrl += `&consumerAddress=${consumerAccount.getId()}`
                consumeUrl += `&signature=${signature}`

                try {
					const response = await fetch(consumeUrl, {
            					method: 'GET',
            					headers: {
                					'Content-type': 'application/json'
            					}
        			})
        			if (!response.ok) {
            			throw new Error('Response error.')
        			}
        			let filename;
        			try {
            			filename = response.headers.get('content-disposition').match(/attachment;filename=(.+)/)[1];
        			} catch (e){
            			try {
                			filename = url.split('/').pop()
            			} catch (e){
                				filename = `file${index}`
            			}
        			}
					newfile.filename=filename;
					newfile.data=b64enc.encode(await response.arrayBuffer())
					responseObj.push(newfile);
					
                    
                } catch (e) {
                    console.error('Error consuming assets')
                    console.error(e)
                    throw e
                }
    		}        
        console.log('Files consumed')
	res.status(200).json(responseObj);
}  
);


export default router;

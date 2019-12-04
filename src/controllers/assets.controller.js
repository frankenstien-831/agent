var sample_metadata = require("../schemas/sample_metadata.js");

exports.GET_sampleMetadata = function () {
    return sample_metadata;
}

exports.GET_searchtext = async function (req, res, text) {
    const query = {
        offset: req.query.offset || 1,
        page: req.query.page || 1,
        query: {
            value: 1
        },
        sort: {
            value: req.query.sort || 1
        },
        text: text
    }

    return res.locals.ocean.aquarius.queryMetadataByText(query);
}


function zeroXTransformer(input, zeroOutput) {
    const { valid, output } = inputMatch(
        input,
        /^(?:0x)*([a-f0-9]+)$/i,
        'zeroXTransformer'
    )
    return (zeroOutput && valid ? '0x' : '') + output
}

const noZeroX = (input) => zeroXTransformer(input, false)
function inputMatch(
    input, regexp, conversorName) {
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


exports.GET_consume = async function (req, res) {
    var responseObj = Array();
    const accounts = await res.locals.ocean.accounts.list()
    var did = req.body.did;
    const consumeAsset = await res.locals.ocean.assets.resolve(did);
    const service = consumeAsset.findServiceByType('Access')
    const agreementId = await res.locals.ocean.assets.order(
        consumeAsset.id,
        service.serviceDefinitionId,
        accounts[0]
    )
    var index = -1;
    var consumerAccount = accounts[0]
    var resultPath = './downloads/';
    var useSecretStore = 0;
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

        var newfile = new Object();
        newfile.ContentType = fileitem.ContentType;
        newfile.index = fileitem.index;
        newfile.contentLength = fileitem.contentLength;
        newfile.compression = fileitem.compression;
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
            } catch (e) {
                try {
                    filename = url.split('/').pop()
                } catch (e) {
                    filename = `file${index}`
                }
            }
            newfile.filename = filename;
            newfile.data = b64enc.encode(await response.arrayBuffer())
            responseObj.push(newfile);


        } catch (e) {
            console.error('Error consuming assets')
            console.error(e)
            throw e
        }
    }
}
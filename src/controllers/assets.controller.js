import { noZeroX } from '@oceanprotocol/squid/dist/node/utils/ConversionTypeHelpers'
import sampleMetadata from '../schemas/metadata.json'
import fetch from 'node-fetch'
import b64enc from 'base64-arraybuffer'

exports.GET_sampleMetadata = function() {
  return sampleMetadata
}

exports.GET_searchtext = async function(req, res, text) {
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

  return res.locals.ocean.aquarius.queryMetadataByText(query)
}

exports.GET_consume = async function(req, res) {
  const responseObj = []
  const accounts = await res.locals.ocean.accounts.list()
  const { did } = req.body
  const consumeAsset = await res.locals.ocean.assets.resolve(did)
  const service = consumeAsset.findServiceByType('Access')
  const agreementId = await res.locals.ocean.assets.order(
    consumeAsset.id,
    service.serviceDefinitionId,
    accounts[0]
  )
  const index = -1
  const consumerAccount = accounts[0]
  // const resultPath = './downloads/'
  // const useSecretStore = 0
  const ddo = consumeAsset
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
    const newfile = {}
    newfile.ContentType = fileitem.ContentType
    newfile.index = fileitem.index
    newfile.contentLength = fileitem.contentLength
    newfile.compression = fileitem.compression
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

      let filename

      try {
        // eslint-disable-next-line prefer-destructuring
        filename = response.headers
          .get('content-disposition')
          .match(/attachment;filename=(.+)/)[1]
      } catch (e) {
        try {
          filename = consumeUrl.split('/').pop()
        } catch (e) {
          filename = `file${index}`
        }
      }
      newfile.filename = filename
      newfile.data = b64enc.encode(await response.arrayBuffer())
      responseObj.push(newfile)
    } catch (e) {
      console.error('Error consuming assets')
      console.error(e)
      throw e
    }
  }
}

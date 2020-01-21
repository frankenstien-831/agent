// Swagger set up
import path from 'path'

export default {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Ocean Protocol Agent',
      version: '0.0.1',
      description:
        'The Ocean Protocol Agent provides a single interface for an Ocean Protocol stack to explore, download, and publish open data sets',
      license: {
        name: 'Apache 2.0',
        url: 'https://choosealicense.com/licenses/apache-2.0/'
      },
      contact: {
        name: 'Ocean Protocol',
        url: 'https://oceanprotocol.com',
        email: 'devops@oceanprotocol.com'
      }
    },
    servers: [
      {
        url: process.env.agentServerUri
      }
    ]
  },
  apis: [
    path.resolve(__dirname, '..', 'routes', 'assets.router.js'),
    path.resolve(__dirname, '..', 'routes', 'general.router.js'),
    path.resolve(__dirname, '..', 'routes', 'network.router.js')
  ]
}

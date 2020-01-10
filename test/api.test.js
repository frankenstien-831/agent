import newman from 'newman'

newman.run(
  {
    collection: require('../docs/agent.postman_collection.json'),
    environment: require('../docs/agent.postman_environment.json'),
    reporters: ['cli', 'json', 'junit'],
    bail: true
  },
  err => {
    if (err) {
      throw err
    }
    console.log('collection run complete!')
  }
)

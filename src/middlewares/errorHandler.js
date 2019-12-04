/**
 * error handling middleware module
 */

const handleErrors = (error, req, res, next) => {
  if (error) {
    const request = Object.keys(req.query).length === 0 ? req.body : req.query
    const resp = Object.assign({}, request)
    const message = error.message ? error.message : error
    resp.success = false
    resp.message = message
    console.error(error)
    res.status(500).json(resp)
    next()
  }
}

export { handleErrors }

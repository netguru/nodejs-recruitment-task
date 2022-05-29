/**
     * If any request not found
     *
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
 */
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}

/**
     * If any request have error
     *
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
 */
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  
  console.log(err)
  res.status(statusCode)
  res.json({
    message: err.message,
    stack:  err.stack,
  })
  next(error)

}

module.exports = { notFound, errorHandler }

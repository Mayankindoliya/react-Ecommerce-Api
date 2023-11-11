

// Error Handling Middleware:
function errorHandlersMiddleware(err, req, res, next) {
 console.log(err)
 res.status(500).json({"message": err.message, "stack": err.stack})
};

module.exports = {
  errorHandlersMiddleware
}
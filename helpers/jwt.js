const jwt = require("jsonwebtoken");

// create JWT token:
function createJwt(payload) {
  const JwtToken = jwt.sign(payload, process.env.JWT_SECRETKEY, {expiresIn: "1 day", issuer: process.env.JWT_ISSUER})
  return JwtToken
}

// verify Jwt
function verifyJwt(token) {
  return jwt.verify(token,  process.env.JWT_SECRETKEY, {issuer: process.env.JWT_ISSUER})
}

module.exports = {
  createJwt,
  verifyJwt
}
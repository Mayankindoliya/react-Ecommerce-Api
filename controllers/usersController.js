const Users = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("../helpers/jwt");

module.exports = class UsersControllers {

  //Register user
  static async registerUser(document) {
    // check if user already exists:
   const existingUser = await Users.findOne({$or: [{email: document.email}, {fullname: document.fullname}]}).lean()
   if(existingUser) {
    throw new Error("User is Already Exists!")
   }
   // Generate a salt and hash user's password with bcrypt
   const salt = bcrypt.genSaltSync(10)
   const hashedPassword = bcrypt.hashSync(document.password, salt)
   document.password = hashedPassword
   // create the user with hashed password
   const user = Users.create(document)
   if(!user) {
    throw new Error("Failed to register user!")
   }
    return user
  };

  // Login user
  static async loginUser(document) {
    const user = await Users.findOne({email: document.email}, "password fullname").lean()
    // check if the user exist or not
    if(!user) {
      throw new Error("user not found")
    }
    if(!bcrypt.compareSync(document.password, user.password)) {
      throw new Error("password not matched")
    }
    const token = jwt.createJwt({_id: user._id})
    return {token, user: {_id: user._id, fullname: user.fullname}}
  }

}
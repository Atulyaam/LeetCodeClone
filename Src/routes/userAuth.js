const express = require('express')
const authRouter = express.Router();

// Register
authRouter.post("/register",register)

// Login
authRouter.post("/login",login)
// Logout
authRouter.post("/logout",logout)
// getProfile
authRouter.post("/profile",getProfile)

// change password
authRouter.post("/change-password",changePassword)

module.exports=authRouter;

// ye jo functions hai ider isno hum controllers me banayege functions

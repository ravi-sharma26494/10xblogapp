const asyncHandler = require('express-async-handler')
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const protect = asyncHandler(async(req, res,next)=>{
    try {
        const token = req.cookies.token;
        // console.log(token)
        if(!token){
            res.status(401)
            throw new Error("Not Authorized, please login");
        }
        const verified = jwt.verify(token, process.env.JWT_SECERET);
       
       const user = await User.findById(verified.id).select("-password")
       console.log(user)
        
        if(!user){
            res.status(401)
            throw new Error("User Not Found");
            
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401)
        throw new Error("Not authorized, please login");
    }
});

module.exports ={
    protect
}
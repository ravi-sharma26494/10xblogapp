const User = require('../models/User');
const asyncHandler = require('express-async-handler')
const jwt  = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Post = require('../models/Post');

const generateToken =  (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn:'1d'});
}

const registerUser = asyncHandler ( async(req, res)=>{
    const {email, password, confirmpassword} = req.body;

    if(!email || !password || !confirmpassword){
        res.status(400)
        throw new Error("All Fields are mandatory");
    }
    if(password.length < 8 ){
        res.status(400)
        throw new Error("Password must have at leaset 8 characters");
    }
    if(password != confirmpassword){
        res.status(400)
        throw new Error("Both passwords should match");
    }
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error("Email has already been registered with us");
    }
    const user = await User.create({
        email,
        password,
        // confirmpassword
    })
    const token  = generateToken(user._id);
    res.cookie("token", token, {
        path:'/',
        httpOnly:true,
        expires: new Date(Date.now()+ 1000*86400),
        sameSite:'none',
        secure:true
    })
    if(user){
        const{_id, email} = user;
        res.status(201).json({
            _id,
            email,
            token
        })
    } else{
        res.status(400)
        throw new Error ("Invalid User Data")
    }
});

//Login user
const loginUser = asyncHandler(async(req, res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400)
        throw new Error("All Fields are mandatory");
    }
    const user = await User.findOne({email});
    if(!user){
        res.status(400)
        throw new Error("You are not registered with us please, register first."); 
    }
    const passwordIsCorrect = await bcrypt.compare(password, user.password)
    const token  = generateToken(user._id);
    res.cookie("token", token, {
        path:'/',
        httpOnly:true,
        expires: new Date(Date.now()+ 1000*86400),
        sameSite:'none',
        secure:true
    }) 
    if(user && passwordIsCorrect){
        const {_id, email} = user;
        res.status(200).json({
            email,
            _id,
            token
        })
    }  else{
        res.status(400)
        throw new Error("Invalid Email or Password!"); 
    }

});

//logout
const logout = asyncHandler(async(req, res)=>{
    res.cookie("token", "", {
        path:'/',
        httpOnly:true,
        expires: new Date(0),
        sameSite:'none',
        secure:true
    });
    return res.status(200).json({message: "Logged Out Successfully"}) 
});


const createPost = asyncHandler(async(req, res)=>{
   const {title, body} = req.body;
    if(!req.body.photo){
        res.status(400)
        throw new Error("Please add an Image to your post"); 
    }
    const post  = new Post({
        title, 
        body,
        photo:req.body.photo,
        postedBy: req.user
    })
    post.save().then((result)=>{
        res.status(200).json({post: result})
    }).catch((error)=>console.log(error));
});
const getAllPost = asyncHandler(async(req, res)=>{
        await Post.find({postedBy:req.user._id}).populate('postedBy', _id)
        .then((myposts)=>{
            res.status(200).json({
                myposts
            })
        }).catch(error=>console.log(error))
});


module.exports = {
    registerUser,
    loginUser,
    logout,
    createPost,
    getAllPost
}
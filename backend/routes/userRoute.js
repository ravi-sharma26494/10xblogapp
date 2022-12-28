const express = require("express");
const { registerUser, loginUser, logout, createPost, getAllPost } = require("../controllers/userControllers");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/logout',logout);
router.get('/getuser',protect ,createPost);
router.get('/getallposts',protect ,getAllPost);

//a protector
module.exports=router;
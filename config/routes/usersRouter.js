const express=require('express');
const router=express.Router();
//const {registerUser,loginUser,logout}=require("../controllers/authController");

const {
    registerUser,
    loginUser,
    logout,
    user,
    userupload,
  } = require("../controllers/authController");

  const isLoggedIn = require("../../middlewares/isLoggedIn");
  const upload = require("../config/multer-Config");

router.get("/",function(req,res){
    res.send("hey it's working");
})

router.post("/register",registerUser )

router.post("/login",loginUser )

router.get("/profile", isLoggedIn, user);

router.post("/userupload", upload.single("image"), isLoggedIn, userupload);

router.get("/logout",logout);

module.exports=router;
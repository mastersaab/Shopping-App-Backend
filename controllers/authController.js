
const userModel=require("../models/user-model");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const cookieParser=require('cookie-parser');
const {generateToken}=require("../utils/generateTokens");

module.exports.registerUser=async function(req,res){
    try{
        let {email,password,fullname}=req.body;

        let user=await userModel.findOne({email:email});
        if(user){
            req.flash("error", "You have already account.");
            return res.redirect("/");
          }


        bcrypt.genSalt(10,function(err,salt){
            bcrypt.hash(password,salt,async function(err,hash){
                if(err) return res.send(err.message);
                else{
                        let user = await userModel.create({
                            email,
                            password:hash,
                            fullname
                        });
                   
                        //yhan se token utha ke util ke gentoken me daldiya
                    
                    let token=generateToken(user);    
                    res.cookie("token",token);
                    req.flash("message", "You have registerd Sucessfully");
                    res.cookie("token", token);
                    res.redirect("/shop");  
                }
            })
        })

    } 
    catch(err){
        res.status(500).send(err.message);
    }
};

module.exports.loginUser=async function(req,res){
    let{email,password}=req.body;

    let user=await userModel.findOne({email:email});
    if(!user) return res.send("Email or Password incorrect");

    bcrypt.compare(password,user.password,function(err,result){
        if(result){
            let token=generateToken(user);
            res.cookie("token",token);
            res.redirect("/shop");
        }
        else{
            req.flash("error", "Email Password Incorrect.");
            return res.redirect("/");
        }
    })
};

module.exports.logout=function(req,res){
    res.cookie("token","");
    res.redirect("/");
};

module.exports.user = async (req, res) => {
    try {
      const user = await userModel.findOne({ email: req.user.email });
      if (!user) {
        req.flash("error", "User not found.");
        return res.redirect("/");
      } else {
        let error = req.flash("error");
        res.render("user.ejs", { user, logedin: true ,error});
      }
    } catch (error) {
      req.flash("error","Somthing went Wrong.");
      return res.redirect("/");
    }
  };
  
  
  //Uploading Profile pic
  module.exports.userupload = async function (req, res) {
    const buffer = req.file.buffer;
    await userModel.findOneAndUpdate(
      { email: req.user.email },
      { picture: buffer },
      { new: true }
    );
  
    res.redirect("/users/profile");
  };
  
  module.exports.user;

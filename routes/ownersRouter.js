const express=require('express');
const router=express.Router();

const isLoggedin = require("../Shopping-App-Backend/middlewares/isLoggedIn");
const ownerModel=require("../Shopping-App-Backend/config/models/owner-model");
const userModel = require("../Shopping-App-Backend/config/models/user-model");

if(process.env.NODE_ENV=="development"){
    router.post("/create",async function(req,res){
        let owners=await ownerModel.find();
        if(owners.length>0) {
            return res
                      .status(504)
                      .send("You don't have permission to create new owner")
        }
        let {fullname,email,password}=req.body;

        let createdOwner=await ownerModel.create({
            fullname,
            email,
            password,
        });
        res.status(201).send(createdOwner);
        //res.send("we can create a new owner.");
   });
}

router.get("/admin",isLoggedin,async function(req,res){
    let user = await userModel.findOne({email:req.user.email});
    let success = req.flash("success");
    res.render("createproducts.ejs",{success,user,currentPage:"Admin"})
});



module.exports=router; 
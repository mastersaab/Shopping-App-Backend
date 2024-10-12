const express=require('express');
const router=express.Router();
const upload=require("../config/multer-config");
const productModel=require("../Shopping-App-Backend/config/models/product-model");



router.post("/create",upload.single("image") ,async function(req,res){

  
  try{
     let {name,price,discount,bgcolor,panelcolor,textcolor}=req.body;   
     let product=await productModel.create({
        image:req.file.buffer,
        name,
        price,
        discount,
        bgcolor,
        panelcolor,
        textcolor
    })
    req.flash("success","Product created Successfully");
    res.redirect("/owners/admin");
   }
   catch (err) {
    return res.send(err.message);
  } 
})

module.exports=router;
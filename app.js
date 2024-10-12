const express=require('express');
const app=express();
const cookieParser=require('cookie-parser');
const path=require('path');
const expressSession=require("express-session");
const flash=require("connect-flash");

const indexRouter = require('./config/routes/index'); 
const ownersRouter=require("./config/routes/ownersRouter");
const productsRouter=require("./config/routes/productsRouter");
const usersRouter=require("./config/routes/usersRouter");

require("dotenv").config();

const db=require("./config/mongoose-connection");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(
    expressSession({
        resave:false,
        saveUninitialized:false,
        secret:process.env.EXPRESS_SESSION_SECRET,
    })
);
app.use(flash());
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");

app.use('/', indexRouter); 
app.use("/owners",ownersRouter);
app.use("/products",productsRouter);
app.use("/users",usersRouter);

app.listen(3000);
const route = require ("express").Router();
const res = require("express/lib/response");
const db =require("./mongo");

route.get("/" , async(req,res)=>{
    const data =await db.mobiles.find().toArray();
    res.send(data);


})

module.exports=route
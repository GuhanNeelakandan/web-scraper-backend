const cors =require("cors");
require("dotenv").config();

const express =require("express");

const mobileroute=require("./mobile")
const mongo =require("./mongo");
const scrap=require("./scraper")

const PORT = process.env.PORT || 8080
const app = express()


app.use(express.json());

app.get("/",(request,response)=>{
    response.send("scraping-mobiles")
});

server=async()=>{
    await mongo.connect();
    await scrap();

    app.use(cors());
    app.use(express.json());

    app.use((req,res,next)=>{
        console.log("Log");
        next();
    })

    app.use("/mobile",mobileroute)
    app.listen(PORT,()=>{
        console.log(`server started at ${PORT}`)
    })
}
server();


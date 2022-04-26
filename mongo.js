const {MongoClient} = require("mongodb")
const mongoClient =  new MongoClient(process.env.MONGO_URL);

let mongo = {
    db:null,
    mobiles:null,
    async connect(){
        try{
             //connect mongodb to SERVER-8080
        await mongoClient.connect();
        this.db = mongoClient.db(process.env.DB);
        this.mobiles=this.db.collection("mobiles");
        }
        catch(err)
        {
            console.log(err);
        }
    } 
}

module.exports = mongo;
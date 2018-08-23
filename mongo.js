module.exports = class Mongo {

    constructor() {
        this.mongo = require('mongodb').MongoClient;
        this.ObjectId = require('mongodb').ObjectId; 

        this.db; // RECEBE A DATABASE E MANTEM A CONEXAO ABERTA (ver this.connect)
    }
    
    
    connect(callback) {
        var obj = this;
        this.mongo.connect('mongodb://localhost:27017/prizeship', { useNewUrlParser: true }, (error, db) => {
            if (error)
                console.log("ERRO AO CONECTAR AO MONGO DB: ", error);
            else {
                obj.db = db;
                if(callback)
                    callback(db);
                else
                    console.log("CALLBACK INVALIDA");
            }    
            //db.close();
        });
    }
}
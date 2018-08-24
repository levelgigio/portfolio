module.exports = class Mongo {

    constructor() {
        this.mongo = require('mongodb').MongoClient;
        this.ObjectId = require('mongodb').ObjectId; 

        this.db; // RECEBE A DATABASE (ver this.connect)
    }

    get_messages(callback) {
        this.connect((db) => {
            db.db('portfolio').collection('messages').find({message: {$exists: true}}).toArray((error, array) => {
                if(error)
                    if(callback)
                        callback({
                            status: "erro ao colocar em matriz as mensagens"
                        });
                    else
                        console.log("ERROR AO COLOCAR EM MATRiZ e CALLBACK INVALIDA ");
                else if(callback)
                    callback({
                        status: "ok", 
                        messages: array
                    });
                else
                    console.log("CALLBACK INVALIDA");
            })
        });
    }

    add_message(message) {
        this.connect((db) => {
            db.db('portfolio').collection('messages').insert(message);
        });
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
            db.close();
        });
    }
}
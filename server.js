var express = require('express');
var app = express();
var server = app.listen(3000);

var Mongo = require('./mongo.js');
var database = new Mongo();

var body_parser = require('body-parser');
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

app.use(express.static('public'));

app.get('/all_messages', (request, response) => {
    database.get_messages((messages) => {
        response.send(messages);
    });
});

app.post('/new_message', (request, response) => {
    if(request.body.message) {
        if(!request.body.name)
            request.body.name = "Anon";
        database.add_message(request.body);
        response.send({
            status: "ok"
        });
    }
    response.send({
        status: "mensagem vazia"
    });
});
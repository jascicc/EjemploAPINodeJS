const express = require('express');
const mongo = require('mongodb');
const mongoClient = mongo.MongoClient;
const router = express.Router();
const url = 'mongodb://localhost:27017';
const db = 'Score';
const coleccion = 'Puntos';

router.get('/Punto/:id', (req, res) => {
    let id = new mongo.ObjectID(req.params.id);
    mongoClient.connect(url, { useNewUrlParser:true }).then(conn => {
        let query = {_id:id};
        return conn.db(db).collection(coleccion).find(query).toArray();
    }).then(prod => {
        if(prod.length == 0)
            res.status(404).json(prod);
        else
            res.status(200).json(prod);
    }).catch(err => console.log(err));
});

router.get('/Puntos/', (req, res) => {
    mongoClient.connect(url, { useNewUrlParser:true }).then(conn => {
        return conn.db(db).collection(coleccion).find().toArray();
    }).then(prods => res.status(200).json(prods))
    .catch(err => console.log(err));
});

router.get('/HighScore/', (req,res) => {
    let mySort = { Puntuacion:-1 };
    mongoClient.connect(url, { useNewUrlParser:true }).then(conn => {
        var highestScore = conn.db(db).collection(coleccion).find().sort(mySort).toArray();
        return highestScore;
    }).then(prods => {
        console.log(prods[0].Jugador+' '+prods[0].Puntuacion); 
        res.status(200).json(prods);
    }).catch(err => console.log(err));
});

module.exports = router;
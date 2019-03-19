const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = require('./rutas');

app.use(bodyParser.json());

app.get('/',(req, res)=>{
    res.send('<h1>Hola mundo WEB!</h1>');
});

app.get('/Persona/:id',(req,res) => {
    let Persona = {
        'Nombre':'Juan Soto',
        'Edad':27,
        'FechaNacimiento':'24/06/1991'
    }

    console.log(Persona);
    res.send(Persona);
});

app.get('/Personas/',(req,res)=>{
    let Personas = [
        {
            'Nombre':'Juan Soto',
            'Edad':27,
            'FechaNacimiento':'24/06/1991'
        },
        {
            'Nombre':'Martín Arce',
            'Edad':23,
            'FechaNacimiento':'27/08/1997'
        }
    ]

    Personas.forEach(element => {
        console.log(element.Nombre+', '+element.Edad+', '+element.FechaNacimiento);
    });
    
    res.send(Personas);
})

//
app.use('/api',router);

app.listen(3000, ()=>{
    console.log('Servidor corriendo en el puerto 3000');
})
const express = require('express');
const app = express();
const User = require('./user.controller');
const port = 3000;

// * Middleware para interpretar json
app.use(express.json());

// * Librería para conecectarse a mongo
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017');

// * Lanzar la app
app.listen(port, 'localhost', () =>{
    console.log('Arrancando la app');
})

// * Definición de endpoints
app.get('/users', User.list);

app.post('/users', User.create);

app.get('/users/:name',  User.get);

app.put('/users/:id', User.update);

app.patch('/users/:id', User.update);

app.delete('/users/:id', User.destroy);

app.use(express.static('app'))

app.get('/',  (req, res) => {
    console.log(__dirname);
    res.sendFile(`${__dirname}/index.html`)
});

app.get('/{*any}', (req, res) => {
    res.status(404).send('La página no existe')
});
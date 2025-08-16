const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const { expressjwt: jwt } = require("express-jwt");
const User = require('./user');

mongoose.connect('mongodb://localhost:27017');

// * instancia de app
const app = express();
// *  Setear lectura de json
app.use(express.json())
// * Metodo para firmar un objeto
const signToken = _id => jsonwebtoken.sign({ _id }, 'fernando')

// * Metodo para validar un objeto
const validateJwt = jwt({ secret: 'fernando', algorithms: ['HS256'] })

// * Controller para registrarse
app.post('/register', async (req, res) => {
    const { body } = req;

    try {
        const isUser = await User.findOne({ email: body.email })
        if (isUser) {
            return res.status(403).send('Usuario ya existe');
        }

        const salt = await bcrypt.genSalt();

        const hashed = await bcrypt.hash(body.pass, salt);
        console.log({ email: body.email, pass: hashed, salt: salt });
        const user = await User.create({ email: body.email, password: hashed, salt: salt });
        const token = signToken(user._id);
        res.status(201).send(token);

    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
})

app.post('/login', async (req, res) => {

    const { body } = req;

    try {

        const user = await User.findOne({ email: body.email });

        if (!user) {
            return res.status(403).send('Usuario o contraseña invalida');
        }
        else {
            console.log(body);
            console.log(user);
            const isMatch = await bcrypt.compare(body.pass, user.password);

            if (isMatch) {
                const signed = signToken(user._id)
                res.status(200).send(signed);
            } else {
                return res.status(403).send('Usuario o contraseña invalida');
            }
        }


    } catch (err) {
        res.status(500).send(err.message)
    }
})

const findAndAssignUser = async (req, res, next) => {
    try {
        console.log('test', req.auth);

        const user = await User.findById(req.auth._id);
        console.log(user);
        if (!user) {
            res.status(401).end();
        }
        req.user = user;

        next();
    } catch (e) {
        next(e);
    }
}

const isAuthenticated = express.Router().use(validateJwt, findAndAssignUser);

app.get('/test', isAuthenticated, (req, res) => {
        res.send(req.user);
})

app.listen(3000, () => {
    console.log('listening in port 3000');
})
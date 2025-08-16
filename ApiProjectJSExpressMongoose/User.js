const mongoose = require('mongoose');

// * Definicion del modelo
const Users = mongoose.model('User', {
    name: { type: String, required: true, minlength: 3, },
    lastname: { type: String, required: true, minlength: 3, }
})

module.exports = Users
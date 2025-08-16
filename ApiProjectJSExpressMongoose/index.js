const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017')

const User = mongoose.model('User', {
    username: String,
    edad: Number
})

// * Servicios o repositories
const crear = async () => {
    const user = new User({username: 'Fernando', edad: 26});
    const response = await user.save();
    // const responseUpdate = await user.updateOne()
    console.log(response);
}

const buscarTodos = async () => {
    const users = await User.find();
    console.log(users);
}

const buscar = async () => {
    const user = await User.find({username: 'Fernando'});
    console.log(user);
    
    const userAlone = await User.findOne({username: 'Fernando'});
    console.log(userAlone);
}


const actualizar = async () => {
    const userAlone = await User.findOne({username: 'Fernando'});
    console.log(userAlone);
    userAlone.username = 'Nicanor';
    await userAlone.save();
    const updatedUser = await User.findOne({username: 'Nicanor'});
    console.log(updatedUser);
}


const eliminar = async () => {
    const user = await User.findOne({username: 'Fernando'});
    console.log(user);
    await user.deleteOne();
    const userAlone = await User.findOne({username: 'Fernando'});
    console.log(userAlone);
}

// crear();
// buscarTodos();
// buscar();
// actualizar();
eliminar();
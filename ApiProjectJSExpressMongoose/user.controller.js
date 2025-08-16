const Users = require('./User')

const User = {
    list: async (req, res) =>{
        const users = await Users.find();
        res.status(200).send(users);
    },
    get: async (req, res)=>{
        const user = await Users.findOne({name: req.body.name});
        res.status(200).send(user._id);
    },
    create: async (req, res) =>{
        const user = await Users.create({name: req.body.name, lastname: req.body.lastname});
        res.status(201).send(user._id);
    },
    update: async (req, res) =>{
        const { id } = req.params;
        console.log(id);
        const user = await Users.findOne({_id: id});
        console.log(user);
        Object.assign(user, req.body);
        console.log(user);
        await user.save();
        res.sendStatus(204)
    },
    destroy: async (req, res) =>{
        const { id } = req.params;
        console.log(id);
        const user = await Users.findOne({_id: id});
        if(user){
            await user.deleteOne();
        }
        res.sendStatus(204);
    }
}

module.exports = User;
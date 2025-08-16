// const userService = require('../user.controller');

const loadInitialTemplate = () => {
    const template = `
        <h1>Usuarios</h1>
        <form id="user-form">
            <div>
                <label>Nombre</label>
                <input name="name" />
            </div>
            <div>
                <label>Apellido</label>
                <input name="lastname" />
            </div>
            <button type="submit">Enviar</button>
        </form>
        <ul id="user-list"></ul>`

    const body = document.getElementsByTagName('body')[0];
    body.innerHTML = template;
}

const addFormListener = () => {
    const userForm = document.getElementById('user-form');
    userForm.onsubmit = async (event) => {

        event.preventDefault();

        const formData = new FormData(userForm);
        const data = Object.fromEntries(formData);
        console.log(JSON.stringify(data));
        
        userForm.reset();
        
        createUser(data);
        getUsers();
    }
}


const addDeleteListener = (id) => {
    const deleteButton = document.getElementsByTagName('user-form');
    userForm.onsubmit = async (event) => {

        event.preventDefault();

        const formData = new FormData(userForm);
        const data = Object.fromEntries(formData);
        console.log(JSON.stringify(data));
        
        userForm.reset();
        
        createUser(data);
        getUsers();
    }
}

getUsers = async () => {
    const response = await fetch('/users');
    const users = await response.json();
    const template = user => `
        <li>
        ${user.name} ${user.lastname} <button data-id="${user._id}">Eliminar</button>
        </li>
    `
    const userList = document.getElementById('user-list');

    userList.innerHTML = users.map(user => template(user)).join('');

    users.forEach(user => {
        const userNode = document.querySelector(`[data-id="${user._id}"]`);
        userNode.onclick = async e => {
            await fetch(`/users/${user._id}`,{
                method: 'DELETE',
            })
            userNode.parentNode.remove();
            alert('Eliminado con exito!');
        }
    });
}

createUser = async (req) => {
    console.log(req);
    await fetch('/users', {
        method: 'POST',
        body: JSON.stringify(req),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}


window.onload = () => {

    loadInitialTemplate();
    addFormListener();
    getUsers();
}
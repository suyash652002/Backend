const express = require('express');
const app = express();
// const mongoose = require('mongoose');
const userModel = require('./usermodel');
const port = 3000;

app.get('/', (req, res) => {
    res.send('helloo');
})

app.get('/create', async (req, res) => {
    let createdUser = await userModel.create({
        name: "Suyash",
        email: "suyash@gmail.com",
        username: "suyasshhhhh"
    })

    res.send(createdUser);
})

app.get('/update', async(req, res) => {
    const updatedUser = await userModel.findOneAndUpdate({ username: "suyasshhhhh" }, { email:"ssuyash@gmail.com" }, { new: true });
    res.send(updatedUser);

})

app.get('/read', async(req, res) =>{
    const Users = await userModel.find();
    res.send(Users);
})

app.get('/delete', async(req, res) =>{
    const deletedUser = await userModel.findOneAndDelete({name:"Suyash"});
    res.send(deletedUser);
})
app.listen(port, () => {
    console.log(`port is running on http://localhost:${port}`);
})
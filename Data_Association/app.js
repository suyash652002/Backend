const express = require('express');
const app = express();
const port = 3000;
const userModel = require('./models/user');
const postModel = require('./models/post');


app.get('/', (req, res) =>{
    res.send("helloo");
});

app.get('/create', async(req, res) =>{
    let user = await userModel.create({
        username : "Suyash",
        age : 22,
        email : "suyash@gmail.com"
    });
    res.send(user);
});

app.get("/post/create", async(req, res) =>{
    let post = await postModel.create({
        postData : "Hello there, how are you",
        user : "6674051e913fe01f5365fe30",
    });

    let user = await userModel.findOne({_id : "6674051e913fe01f5365fe30"});
    user.posts.push(post._id); 
    await user.save();
    res.send({post, user});
});

app.listen(port, ()=>{
    console.log(`port is running on http://localhost:${port}`);
});
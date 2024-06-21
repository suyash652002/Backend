const { urlencoded } = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('./models/user');
const postModel = require('./models/post');        
const multer = require('multer')

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());




app.get('/', (req, res) => {
    res.render('index');
});

app.get('/test', (req, res) => {
    res.render('test');
});

app.post("/upload", (req, res) =>{
    console.log(req.body);
    res.redirect("/test");
})

app.get("/login", (req, res) =>{
    res.render("login");
});

app.get("/profile",isLoggedIn, async(req, res) =>{
    let user = await userModel.findOne({email : req.user.email}).populate("posts");
    // console.log(user);

    res.render("profile", {user});
});

app.get("/like/:id",isLoggedIn, async(req, res) =>{
    console.log(req.params.id);
    let post = await postModel.findOne({_id : req.params.id}).populate("user");
    // console.log(post);
    // console.log(req.user);

    if(post.likes.indexOf(req.user.userid) === -1)
    {
        post.likes.push(req.user.userid);
    }
    else
    {
        post.likes.splice(post.likes.indexOf(req.user.userid), 1);
    }
    
    await post.save();

    res.redirect('/profile');
});

app.get("/edit/:id",isLoggedIn, async(req, res) =>{
    let post = await postModel.findOne({_id : req.params.id}).populate("user");
    res.render('edit', {post});
});

app.post("/update/:id",isLoggedIn, async(req, res) =>{
    let post = await postModel.findOneAndUpdate({_id : req.params.id}, {content : req.body.content});
    res.redirect('/profile');
});

app.post("/post",isLoggedIn, async(req, res) =>{
    let user = await userModel.findOne({email : req.user.email});
    let {content} = req.body;
    let post = await postModel.create({user : user._id, content : content});
    user.posts.push(post._id);
    user.save(); 
    res.redirect('/profile');
});

app.get("/logout", (req, res)=>{
    res.cookie("token", "");
    res.render("login");
});

app.post("/register", async(req, res)=>{
    let{name, username, email, password, age} = req.body;

    let user = await userModel.findOne({email});
    if(user) return res.status(500).send("User already registered");

    bcrypt.genSalt(10, (err, salt) =>{
        bcrypt.hash(password, salt, async(err, hash) =>{
            let user = await userModel.create({
                username,
                name,
                password : hash,
                email,
                age
            });
            let token = jwt.sign({email : email, userid : user._id}, "shhhh");
            res.cookie("token", token);
            res.send("registered");
        });
    });
});

app.post("/login", async(req, res)=>{
    let{email, password} = req.body;
    let user = await userModel.findOne({email});
    if(!user) return res.status(500).send("Something went wrong");

    bcrypt.compare(password, user.password, (err, result) =>{
        if(result) 
            {
                console.log("password matched");
                let token = jwt.sign({email : email, userid : user._id}, "shhhh");
                res.cookie("token", token);
                res.status(200).redirect("/profile");
            }
        else
        {
            console.log("password didn't matched");
            res.render('login');
        }
    })
});


function isLoggedIn(req, res, next)
{
    if(req.cookies.token === "") res.redirect('/login');
    else{
        let data = jwt.verify(req.cookies.token, "shhhh")
        // console.log(data);
        req.user = data;   // created a field in request and added this token data, in case if you want to access data in future;
        next();
    }
}


app.listen(port, () => {
    console.log(`port is running on http://localhost:${port}`);
});
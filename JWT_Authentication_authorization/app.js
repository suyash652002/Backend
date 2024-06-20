const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const port = 30000;
const path = require('path');
const userModel = require('./models/user');
const jwt = require('jsonwebtoken');

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.render('index');
})

app.post('/create', (req, res) => {
    const { username, email, password, age } = req.body;
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            const newUser = await userModel.create({ username, password : hash, email, age });
        });
        let token = jwt.sign({email : email}, "shhhhh");
        res.cookie("token", token);
        res.redirect('/');
    });
});

app.get('/login', (req, res) =>{
    res.render('login');
})

app.post('/login', async(req, res) =>{
    // const {email, password} = req.body;
    let finduser = await userModel.findOne({email : req.body.email});
    if(!finduser) return res.send("Something went wrong");

    console.log(finduser.password, req.body.password);

    bcrypt.compare(req.body.password, finduser.password, (err, result) =>{
        if(err) throw err;
        if(result) 
            {
                let token = jwt.sign({email : finduser.email}, "shhhhh");
                res.cookie("token", token);
                console.log('Password matched');
                res.send("You can login");
            }
        else 
        {
            console.log("Invalid password");
            res.send("something is wrong");
        }
    });
    


})

app.get("/logout", (req, res)=>{
    res.cookie("token", "");
    res.redirect('/login');
})

app.listen(port, () => {
    console.log(`port is listening on http://localhost:${port}`)
})
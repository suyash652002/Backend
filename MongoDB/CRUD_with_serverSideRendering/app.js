const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./models/user');
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/read', async (req, res) => {
    const users = await userModel.find();
    console.log(users);
    res.render('read', { users });

})

app.get('/delete/:id', async(req, res)=>{
    const deletedUser = await userModel.findByIdAndDelete(req.params.id);
    res.redirect('/read');
})

app.get('/edit/:id', async(req, res) =>{
    const user = await userModel.findOne({_id : req.params.id});
    res.render('edit', {user});
})

app.post('/update/:id', async(req, res)=>{
    let {image, email, name} = req.body;
    const updatedUser = await userModel.findOneAndUpdate({_id : req.params.id}, {image, name , email}, {new : true});
    res.redirect('/read');
})
app.post('/create', async (req, res) => {
    const data = req.body;
    const newUser = await userModel.create({ name: data.name, image: data.image, email: data.email });
    console.log(newUser);
    res.redirect('/read');
})


app.listen(port, () => {
    console.log(`port is listening on http://localhost:${port}`);
})
const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render("index");
});

app.get('/profile/:username', (req, res)=>{
    res.send(`Hello ${req.params.username}`);
});

app.get('/profile/:username/:age', (req, res) =>{
    res.send(req.params);
})

app.listen(port, () => {
    console.log(`Port is running on http://localhost:${port}`);
})
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const fs = require('fs');

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    fs.readdir(`./files`, (err, files) => {
        console.log(files);
        res.render('index', { files: files });
    });
})

app.post('/create', (req, res) => {
    // console.log(req.body);
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, `${req.body.details}`, (err) => {
        if (err) console.log(err);
        else console.log("Successfully added");
    })
    res.redirect('/');
})

app.listen(port, () => {
    console.log(`Port is running on http://localhost:${port}`);
})
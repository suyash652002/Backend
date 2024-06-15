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
        // console.log(files);
        res.render('index', { files: files });
    });
})

app.get('/file/:filename', (req, res) => {
    fs.readFile(`./files/${req.params.filename}`, 'utf-8', (err, data) => {
        console.log(data);
        res.render('show', { filedata: data, filename: req.params.filename });
    })
})

app.get('/edit/:filename', (req, res) => {
    fs.readFile(`./files/${req.params.filename}`, 'utf-8', (err, data) => {
        console.log(data);
        res.render('edit', { prevname: req.params.filename });
    })
})

app.post('/create', (req, res) => {
    // console.log(req.body);
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, `${req.body.details}`, (err) => {
        if (err) console.log(err);
        else console.log("Successfully added");
    })
    res.redirect('/');
})

app.post('/update', (req, res) =>{
    // console.log(req.body);
    fs.rename(`./files/${req.body.previous}`, `./files/${req.body.new}`, (err)=>{
        if(err) console.log(err);
        else console.log("renamed successfully");
    })
    res.redirect('/');
})

app.listen(port, () => {
    console.log(`Port is running on http://localhost:${port}`);
})
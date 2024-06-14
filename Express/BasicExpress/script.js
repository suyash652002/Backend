var express = require('express');
const app = express();
const port = 3000;

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();

})
app.get('/', (req, res) => {
    res.send("Hellooo");
});

app.get('/profile', (req, res) => {
    res.send('Hi My name is Suyash');
})
app.listen(port, () => {
    console.log(`Port is running on http://localhost:${port}`);
});
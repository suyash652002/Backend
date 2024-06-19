const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const port = 3000;

app.use(cookieParser());

app.get('/', (req, res) => {
    let token = jwt.sign({email: "suyash@gmail.com"}, 'secret');
    
    res.send("hello");
})


// const saltRounds = 10;
// const plainPassword = "Suyash";
// bcrypt.genSalt(saltRounds, (err, salt) => {
//     if (err) throw err;
//     console.log(salt);
//     bcrypt.hash(plainPassword, salt, (err, hash) => {
//         if (err) throw err;
//         // console.log("Hashed Password: ", hash);
//     })
// })

// const storedHash = "$2b$10$zCxbQSODCIFWRBjniLfqtODhpw3Rn9/AJuXgGOybp6N3Ky4ZT5bEi";

// bcrypt.compare(plainPassword, storedHash, (err, result) => {
//     if (err) console.log(err);
//     else
//         if (result) {
//             console.log("password matched");
//         }
//         else {
//             console.log("wrong password");
//         }
// })


app.listen(port, () => {
    console.log(`port is listening on http://localhost:${port}`);
})


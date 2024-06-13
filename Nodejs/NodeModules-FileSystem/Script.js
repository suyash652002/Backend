var fs = require('fs');

// fs.writeFile("hey.txt", "Hellooooo How are you", function (err) {
//     if (err) console.log(err);
//     else console.log("File Created!");
// })

// fs.appendFile("hey.txt", " I'm fine!", function (err) {
//     if (err) console.log(err);
//     else console.log("text appended");
// })

// fs.rename("hey.txt", "hello.txt", function (err) {
//     if (err) console.log(err);
//     else console.log("file renamed successfully!");
// })

// fs.copyFile("hello.txt", "./copy/newHello.txt", function (err) {
//     if (err) console.log(err.message);
//     else console.log("copied successfully!");
// })

// fs.copyFile("hello.txt", "./newFile.txt", function (err) {
//     if (err) console.log(err.message);
//     else console.log("file copied");
// })

// fs.unlink("newFile.txt", function (err) {
//     if (err) console.log(err);
//     else console.log("File deleted");
// })

// fs.readFile("./index.html", "utf-8", function (err, data) {
//     if (err) console.log(err.message);
//     else console.log(data);
// })

fs.readFile("hello.txt", "utf-8", function (err, data) {
    if (err) console.log(err.message);
    else console.log(data);
})
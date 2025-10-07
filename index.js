const express = require("express");
const app = express();

app.listen(3000, () => {
  console.log("Connected on 3000");
});

app.get("/", (req, res) => {
  res.send("hello ji");
});

app.get("/about", (req, res) => {
  res.send("this is about page");
});

app.get("/gallery", (req, res) => {
  res.send("this is about page");
});

app.get("/about/user", (req, res) => {
  res.send("this is about user page");
});

// this will print the json value
app.get("/user/:userid", (req, res) => {
  res.send(req.params);
});

// nested route with mulitple params
app.get("/user/:userid/book/:bookid", (req, res) => {
  // this will print the json value with both params
  res.send(req.params);

  // this will print only bookid
  // res.send(req.params.bookid);

  // this will print only userid
  // res.send(req.params.userid);
});

app.get("/product/:category-:productid", (req, res) => {
    res.send(req.params);
});

//put this link and see the results
// http://localhost:3000/search?name=kartik&class=12th

app.get("/search", (req, res) => {
    let name = req.query.name;

    let standard = req.query.class;
    res.send("student name: "+ name + " standard is: "+ standard);
});
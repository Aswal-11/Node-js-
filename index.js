const express = require("express");
const app = express();

app.listen(3000, () => {
  console.log("Connected on 3000");
});

app.set("view engine", 'ejs');

app.get("/", (req, res) => {
  // res.json({
  //   name: "hello ji",
  // });

  const users = [
    {
      id:1, name:'rohan'
    },
    {
      id:2, name:'mohan'
    }
  ]

  res.json(users);
});

app.get("/about", (req, res) =>{
  res.redirect(301,'https://www.google.com')
})

app.get("/blog", (req, res) =>{
  res.send("blog page");
})

app.get("/contact", (req, res) =>{
  res.send('this is contact page');
})


// headersent is used to see the response
app.get("/user", (req, res) =>{
  console.log(res.headersSent);
  res.send('this is user page');
  console.log(res.headersSent);
})

// this go back to user route because it always route to parent route 
app.get("/user/userid/riad", (req, res) => {
  res.redirect("..");
});

// http://localhost:3000/user/1/book/1
app.get("/user/:userid/book/:bookid", (req, res) => {
  res.send(req.params);
});

// Throough this route we can render the html pages
// command to install the ejs is "npm i ejs"
app.get("/course", (req, res)=>{
  res.render('course'); 
})

// we can download any file through this method 
// whenever we open this link it will forcefully download the pdf
app.get('/download', (req, res)=>{
  res.download('./files/Kartik_aswal_resume.pdf', 'resume.pdf');
})

// we use this link it will open the resume in same in tab and dont let you to download the file forcefully 
app.get('/resume', (req,res)=>{
  res.sendFile(__dirname+ '/files/Kartik_aswal_resume.pdf')
})

// res.end()
// Ends the response process.
// Without this, the client would keep waiting for more data (the request wouldn’t “finish”).
// Optionally, you can also pass data into res.end(), like res.end("Done").
app.get('/end',(req, res)=>{
  res.write("This is testing ");
  res.end('Done');
})

// this method is used to give the page statu
app.get('/error', (req, res)=>{
  res.sendStatus(404);
})

app.get('/checkstatus',(req, res)=>{
  res.status(200).send('Hello');
})


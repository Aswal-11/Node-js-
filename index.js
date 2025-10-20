const express = require("express");
const app = express();

app.listen(3000, () => {
  console.log("Connected on 3000");
});

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  // res.json({
  //   name: "hello ji",
  // });

  const users = [
    {
      id: 1,
      name: "rohan",
    },
    {
      id: 2,
      name: "mohan",
    },
  ];

  res.json(users);
});

app.get("/about", (req, res) => {
  res.redirect(301, "https://www.google.com");
});

app.get("/blog", (req, res) => {
  res.send("blog page");
});

app.get("/contact", (req, res) => {
  res.send("this is contact page");
});

// headersent is used to see the response
app.get("/user", (req, res) => {
  console.log(res.headersSent);
  res.send("this is user page");
  console.log(res.headersSent);
});

// this go back to user route because it always route to parent route
app.get("/user/userid/riad", (req, res) => {
  res.redirect("..");
});

// http://localhost:3000/user/1/book/1
app.get("/user/:userid/book/:bookid", (req, res) => {
  res.send(req.params);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Throough this route we can render the html pages
// command to install the ejs is "npm i ejs"
app.get("/course", (req, res) => {
  res.render("course");
});

// we can download any file through this method
// whenever we open this link it will forcefully download the pdf
app.get("/download", (req, res) => {
  res.download("./files/Kartik_aswal_resume.pdf", "resume.pdf");
});

// we use this link it will open the resume in same in tab and dont let you to download the file forcefully
app.get("/resume", (req, res) => {
  res.sendFile(__dirname + "/files/Kartik_aswal_resume.pdf");
});

// res.end()
// Ends the response process.
// Without this, the client would keep waiting for more data (the request wouldn’t “finish”).
// Optionally, you can also pass data into res.end(), like res.end("Done").
app.get("/end", (req, res) => {
  res.write("This is testing ");
  res.end("Done");
});

// this method is used to give the page statu
app.get("/error", (req, res) => {
  res.sendStatus(404);
});

app.get("/checkstatus", (req, res) => {
  res.status(200).send("Hello");
});

//we will use this on postman and can see the body data
app.post("/poster", (req, res) => {
  res.send(req.body);
});

app.get("/task", (req, res) => {
  // res.send(req.hostname); // through this we can know the hostname
  // res.send(req.ip); // through this we can know the ip
  // res.send(req.ips); // through this we can know the multiple ips
  // res.send(req.method);  // through this we can know the method that we are using with the route
  // res.send(req.originalUrl); //Gives the complete URL path (including query string).
  //res.send(req.path); // Gives only the path part of the URL (excluding query strings).
  //res.send(req.protocol); // it will tells you which type of protocol you are using
  // res.send(req.secure); // it will you if the site is http then it will return the false, if https then return the true
  // res.send(req.route); // it will give the info about the route
});

app.get("/acceptor", (req, res) => {
  // this if req accept the html then return the html
  // if(req.accepts('html')){
  //   res.send("<h1>Hello html</h1>")
  // }else if(req.accepts('json')){
  //   res.send({message: 'hello json'})
  // }else if(req.accepts('xml')){
  //   res.send("<message>Hello xml</message>")
  // }else{
  //   res.send("content type not supported");
  // }
  //res.send(req.headers); // it provide the whole information about the route
  // res.send(req.get('host'));
  // res.send(req.get('connection'));
  //res.send(req.get('accept')); // it will tell that hamara host kya kya accept kar skta hai
});

app.post("/realcheck", (req, res) => {
  // ye check kar ra hai ki jo user ki request ari hai wserver pe kya wo json format hai ya wo htmlya text ka format hai
  if (req.is("text/html")) {
    res.send("<h1>Hello html</h1>");
  } else if (req.is("application/json")) {
    res.send({ message: "hello json" });
  } else {
    res.status(400).send("unsupported content -type");
  }
});

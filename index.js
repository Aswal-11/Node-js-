import express from 'express'

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send("<h1>Home page</h1>");
});

app.get('/about', (req, res) => {
  // let items = ['a', 'b', 'c', 'd' ,'e '];
  let items = [
    { id: 1, name: "Apple", color: "red", location:"Delhi" },
    { id: 2, name: "Banana", color: "yellow", location:"Delhi" },
    { id: 3, name: "Grapes", color: "green", location:"Delhi" },
    { id: 4, name: "Orange", color: "orange", location:"Delhi" }
  ];

  res.render('about', {
    title: 'About page',
    content: 'Welcome to about page',
    message: "hi",
    items
  });
});

app.get('/form', (req, res)=>{
  res.render('form',{message:null})
})

app.post('/submit', (req, res)=>{
  //const name = req.body // Through this we can see what we are recieve in the route request
  const message = req.body.myname;
  res.render('form', {message:message});
})

app.listen(3000, () => {
  console.log('server successfully started on port number: 3000')
})
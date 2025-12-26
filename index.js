import express, { response } from 'express'
import mongoose from 'mongoose';
import Contact  from './models/contacts.model.js';

const app = express();

// Database 
mongoose.connect('mongodb://127.0.0.1:27017/contacts-crud')
.then(()=>{console.log("Database connected")});

//Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));

// Main Contact Page
app.get('/', async(req, res)=>{
  const contacts = await Contact.find();// this bring the 
  // res.json(contacts);
  res.render("home", {contacts});
});

// Person Contact page
app.get('/show-contact/:id', async(req, res)=>{
  const contact = await Contact.findById({_id: req.params.id});
  // res.json(contacts);
  res.render('show-contact', {contact})
});

app.get('/add-contact', (req, res)=>{res.render('add-contact')});

app.post('/add-contact', async(req, res)=>{
  await Contact.create(req.body); //mongoose method 
  res.redirect("/");
});

app.get('/update-contact/:id', async(req, res)=>{
  const contact = await Contact.findById({_id: req.params.id});
  // res.json(contact);
  res.render('update-contact',{contact});
});


// req.body -- we use this only when form fields and database collection field matches 
app.post('/update-contact/:id', async(req, res)=>{
  //const{first_name, last_name, email, phone, address} = req.body
  // await Contact.findByIdAndUpdate(req.params.id, {first_name, last_name, email, phone, address});
  await Contact.findByIdAndUpdate(req.params.id, req.body);
  // res.send(req.body)
  res.redirect("/");
});

app.get('/delete-contact/:id', async(req, res)=>{
  await Contact.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

app.listen(3000, () => {
  console.log('server successfully started on port number: 3000')
})
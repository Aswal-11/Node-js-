import express from 'express'
import contactRoutes from './rotues/contacts.routes.js';
import { connectDB } from './config/database.js';

const app = express();

// Database Connection
connectDB();

//Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));

app.use('/', contactRoutes);

app.listen(3000, () => {
  console.log('server successfully started on port number: 3000')
})
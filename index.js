import express from 'express'
import contactRoutes from './rotues/contacts.routes.js';
import { connectDB } from './config/database.js';

const app = express();
const PORT =  process.env.PORT || 3000;

/**
 * Database Connection
 */
connectDB(); 

/**
 * Middleware
 */
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));

/**
 * Routes
 */
app.use('/', contactRoutes);

app.listen(PORT, () => {
  console.log(`server successfully started on port number: ${PORT}`)
})
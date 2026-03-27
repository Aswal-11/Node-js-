import { body, validationResult } from 'express-validator';// for the validation you have to use this 
import Contact from '../models/contacts.model.js';
import Form from '../models/form.model.js';
import mongoose from 'mongoose';

// res.json(contacts);
export const getContacts = async (req, res) => {
  try {
    const { page = 1, limit = 3 } = req.query;

    const options = {
      page: parseInt(page),
      limit: parseInt(limit)
    }
    const result = await Contact.paginate({}, options);
    // res.json(result);
    // const contacts = await Contact.find();
    res.render("home", {
      totalDocs: result.totalDocs,
      limit: result.limit,
      totalPages: result.totalPages,
      currentPage: result.page,
      counter: result.pagingCounter,
      hasPrevPage: result.hasPrevPage,// contain boolean value
      hasNextPage: result.hasNextPage,// contain boolean value
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      contacts: result.docs
    });
  } catch (error) {
    return res.render('500', { message: error });
  }
}

/**
  * This checks whether the id is valid or not
  * mongoose.Types.ObjectId.isValid(req.params.id
  * The length of id must be 12 or 24 hex characters
  */
export const getContact = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id) && req.params.id.length !== 24) {
    return res.render('404', { message: 'Invalid Contact ID' });
  }
  try {
    const contact = await Contact.findById(req.params.id);
    // res.json(contacts);
    if (!contact) {
      return res.render('404', { message: 'Contact Not Found' });
    }
    res.render('show-contact', { contact })
  } catch (error) {
    res.render('500', { message: error });
  }
}

export const addContactPage = (req, res) => { res.render('add-contact') }

export const addContact = async (req, res) => {
  try {
    await Contact.create(req.body); //mongoose method 
    res.redirect("/");
  } catch (error) {
    res.render('500', { message: error });
  }
}

export const updateContactPage = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id) && req.params.id.length !== 24) {
    return res.render('404', { message: 'Invalid Contact ID' });
  }

  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.render('404', { message: 'Contact Not Found' });
    }
    // res.json(contact);
    res.render('update-contact', { contact });
  } catch (error) {
    res.render('500', { message: error });
  }
}

/**
 * req.body -- we use this only when form fields and database collection field matches 
 * const{first_name, last_name, email, phone, address} = req.body
 * await Contact.findByIdAndUpdate(req.params.id, {first_name, last_name, email, phone, address});
 */
export const updateContact = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id) && req.params.id.length !== 24) {
    return res.render('404', { message: 'Invalid Contact ID' });
  }
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body);
    if (!contact) {
      return res.render('404', { message: 'Contact Not Found' });
    }
    res.redirect("/");
  } catch (error) {
    res.render('500', { message: error });
  }
}

export const deleteContact = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id) && req.params.id.length !== 24) {
    return res.render('404', { message: 'Invalid Contact ID' });
  }
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.render('404', { message: 'Contact Not Found' });
    }
    res.redirect("/");
  } catch (error) {
    res.render('500', { message: error });
  }
}

export const openForm = async (req, res) => {
  res.render('form', { error: [] });
}
export const validationRegistration = [
  body('username')
    .notEmpty().withMessage('Userame is required')
    .isLength({ min: 3, max: 30 }).withMessage('Username must be between 3 and 30 characters')
    .isString().withMessage('Username must be a string')
    .trim()
    .custom(value =>{
      if(value === 'admin'){
        throw new Error('Username cannot be admin');
      }
      return true;
    })
    .customSanitizer(value => value.toLowerCase()),

  body('useremail')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Enter the correct Email id')
    .normalizeEmail(),

  body('userpassword')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6, max: 30 }).withMessage('Password must be at least 6 characters long'),

  body('userage')
    .notEmpty().withMessage('Age is required')
    .isInt({ min: 1, max: 120 }).withMessage('Enter a valid age between 1 and 120'),

  body('usercity')
    .isIn(['delhi', 'mumbai', 'bangalore', 'chennai']).withMessage('City must be one of Delhi, Mumbai, Bangalore, Chennai')

];
export const submitForm = async (req, res) => {
  const error = validationResult(req);

  if (error.isEmpty()) {
    return res.send(req.body);
  }

  res.render('form', { error: error.array() })
};

// export const submitForm = async(req, res)=>{
//   await Form.create(req.body);
//   res.redirect("/");
// }
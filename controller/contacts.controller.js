import Contact from '../models/contacts.model.js';
import mongoose from 'mongoose';

export const getContacts = async (req, res) => {
  const contacts = await Contact.find();
  // res.json(contacts);
  res.render("home", { contacts });
}

 /**
   * This checks whether the id is valid or not
   * mongoose.Types.ObjectId.isValid(req.params.id
   * The length of id must be 12 or 24 hex characters
   */
export const getContact = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.render('404', { message: 'Invalid Contact ID' });
  }
  try {
    const contact = await Contact.findById(req.params.id);
    // res.json(contacts);
    if (!contact) {
      res.render('404', { message: 'Contact Not Found' });
    }
    res.render('show-contact', { contact })
  } catch (error) {
    res.render('500', { message: error });
  }
}

export const addContactPage = (req, res) => { res.render('add-contact') }

export const addContact = async (req, res) => {
  await Contact.create(req.body); //mongoose method 
  res.redirect("/");
}

export const updateContactPage = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.render('404', { message: 'Invalid Contact ID' });
  }

  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.render('404', { message: 'Contact Not Found' });
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
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.render('404', { message: 'Invalid Contact ID' });
  }
  try {
    await Contact.findByIdAndUpdate(req.params.id, req.body);
  } catch (error) {
    res.render('500', { message: error });
  }
  // res.send(req.body)
  res.redirect("/");
}

export const deleteContact = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.render('404', { message: 'Invalid Contact ID' });
  }
  try {
    await Contact.findByIdAndDelete(req.params.id);
  } catch (error) {
    res.render('500', { message: error });
  }
  res.redirect("/");
}
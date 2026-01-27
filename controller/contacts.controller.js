import Contact from '../models/contacts.model.js';
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
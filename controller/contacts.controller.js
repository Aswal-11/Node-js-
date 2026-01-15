import Contact  from '../models/contacts.model.js';

export const getContacts = async(req, res)=>{
  const contacts = await Contact.find();// this bring the 
  // res.json(contacts);
  res.render("home", {contacts});
}

export const getContact = async(req, res)=>{
  const contact = await Contact.findById({id: req.params.id});
  // res.json(contacts);
  res.render('show-contact', {contact})
}

export const addContactPage = (req, res)=>{res.render('add-contact')}

export const addContact = async(req, res)=>{
  await Contact.create(req.body); //mongoose method 
  res.redirect("/");
}

export const updateContactPage = async(req, res)=>{
  const contact = await Contact.findById({id: req.params.id});
  // res.json(contact);
  res.render('update-contact',{contact});
}

// req.body -- we use this only when form fields and database collection field matches 
export const updateContact = async(req, res)=>{
  //const{first_name, last_name, email, phone, address} = req.body
  // await Contact.findByIdAndUpdate(req.params.id, {first_name, last_name, email, phone, address});
  await Contact.findByIdAndUpdate(req.params.id, req.body);
  // res.send(req.body)
  res.redirect("/");
}

export const deleteContact = async(req, res)=>{
  await Contact.findByIdAndDelete(req.params.id);
  res.redirect("/");
}
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// create a reference to the model
let Contacts = require('../models/contacts');

module.exports.displayContactsList = (req, res, next) => {
    Contacts.find((err, contactsList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {

            res.render('contacts/list', 
            {title: 'Business Contacts', 
            ContactsList: contactsList});      
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('contacts/add', 
    {title: 'Add Contact'})          
}

module.exports.processAddPage = (req, res, next) => {
    let newContacts = Contacts({
        "name": req.body.name,
        "number": req.body.number,
        "email": req.body.email
       
    });

    Contacts.create(newContacts, (err, Contacts) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the  list
            res.redirect('/contact-list');
        }
    });

}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Contacts.findById(id, (err, contactsToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('contacts/edit', 
            {title: 'Edit Contact', 
            contacts: contactsToEdit})
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedContacts = Contacts({
        "_id": id,
        "name": req.body.name,
        "number": req.body.number,
        "email": req.body.email
    });

    Contacts.updateOne({_id: id}, updatedContacts, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the list
            res.redirect('/contact-list');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Contacts.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
             // refresh the list
             res.redirect('/contact-list');
        }
    });
}
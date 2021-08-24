'use strict';

const basicAuth = require('./middleWare/bassic');
const bearerAuth = require('./middleWare/bearer');

const express = require('express');
const router = express.Router();

const acl = require('./middleWare/acl')

const Users = require('../middleWare/oauth').users

// app level middleware


// {"username":"test", "password":"test"}
router.post('/signup', (req, res) => {
    // check if user name exists
    // console.log(req.body);
    Users.create(req.body)
        .then(user => res.status(201).send(user))
        .catch(err => res.status(400).send(err))
});

router.post('/signin', basicAuth(Users), (req, res) => {
    // the user will have the user info and the token
    res.status(200).send(req.user);
});

router.get('/user', bearerAuth(Users), (req, res) => {
    res.status(200).send(req.user);
});



//  Lab 08

router.get('/update', bearerAuth(Users),acl('update'), (req, res) => {
    res.status(200).send("Update Done");
});

router.get('/read', bearerAuth(Users),acl('read'), (req, res) => {
    res.status(200).send("Read Done");
});

router.get('/write', bearerAuth(Users),acl('create'), (req, res) => {
    res.status(200).send("Write Done");
});

router.get('/edit', bearerAuth(Users),acl('delete'), (req, res) => {
    res.status(200).send("Edit Done");
});

let test = (req,res,next)=>{
    next('Internal Error!!')
}

router.get('/badLink', test)


module.exports = router
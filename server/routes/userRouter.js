const express = require('express');

const userController = require('../controllers/userController');

const Router = express.Router();

Router.post('/signup', userController.createUser, (req, res) => {
  res.status(200).json(res.locals);
});

Router.post('/login', userController.findUser, (req, res) => {
  res.status(200).json(res.locals);
});

Router.get('/:id', userController.getUser, (req, res) => {
  res.status(200).json(res.locals);
});

Router.put('/:id', userController.createDoc, (req, res) => {
  res.status(200).json(res.locals);
});

// Router.get('/:id/docs', userController.getDocs, (req, res) => {
//   res.status(200).json(res.locals);
// });

module.exports = Router;

const User = require('../models/userModel');
const markdownController = require('../controllers/markdownController');

const createErr = (errInfo) => {
  const { method, type, err } = errInfo;
  return {
    log: `userController.${method} ${type}: ERROR: ${
      typeof err === 'object' ? JSON.stringify(err) : err
    }`,
    message: {
      err: `Error occurred in userController.${method}. Check server logs for more details.`,
    },
  };
};

const userController = {
  async createUser(req, res, next) {
    try {
      const { username, password } = req.body;
      const user = await User.create({ username, password });
      res.locals = { user };
      next();
    } catch (err) {
      next(
        createErr({
          method: 'createUser',
          type: JSON.stringify(err),
          err,
        })
      );
    }
  },

  async findUser(req, res, next) {
    try {
      const { username, password } = req.body;
      const user = await User.find({ username, password });
      res.locals = { user: user[0] };
      next();
    } catch (err) {
      next(
        createErr({
          method: 'findUser',
          type: JSON.stringify(err),
          err,
        })
      );
    }
  },

  async getUser(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findById(id).exec();
      console.log(user);
      res.locals = { user };
      next();
    } catch (err) {
      next(
        createErr({
          method: 'getUser',
          type: JSON.stringify(err),
          err,
        })
      );
    }
  },

  async getDocs(req, res, next) {
    try {
      const { id } = req.params;
      const _user = await User.findById(id).exec();
      console.log(_user);
      res.locals.docs = _user.documents;
      next();
    } catch (err) {
      next(
        createErr({
          method: 'getDocs',
          type: JSON.stringify(err),
          err,
        })
      );
    }
  },

  async createDoc(req, res, next) {
    try {
      const { id } = req.params;
      const _user = await User.findById(id).exec();
      const user = await User.updateOne(
        { _id: id },
        { documents: [{ title: 'Untitled.md', body: '' }] }
      );

      console.log(_user);
      res.locals.docs = user;
      next();
    } catch (err) {
      next(
        createErr({
          method: 'createDoc',
          type: JSON.stringify(err),
          err,
        })
      );
    }
  },
};

module.exports = userController;

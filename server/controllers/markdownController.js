const Markdown = require('../models/markdownModel');
const fs = require('fs/promises');
const path = require('path');

const createErr = (errInfo) => {
  const { method, type, err } = errInfo;
  return {
    log: `markdownController.${method} ${type}: ERROR: ${
      typeof err === 'object' ? JSON.stringify(err) : err
    }`,
    message: {
      err: `Error occurred in markdownController.${method}. Check server logs for more details.`,
    },
  };
};

const markdownController = {
  async getAllMarkdown(req, res, next) {
    try {
      const markdowns = await Markdown.find({}).exec();
      console.log(markdowns);
      res.locals.markdowns = markdowns;
      next();
    } catch (err) {
      next(
        createErr({
          method: 'getAllMarkdown',
          type: JSON.stringify(err),
          err,
        })
      );
    }
  },

  async createMarkdown(req, res, next) {
    try {
      const newMarkdown = await Markdown.create({
        title: 'Untitled',
        body: '',
      });
      res.locals.newMarkdown = newMarkdown;
      next();
    } catch (err) {
      next(
        createErr({
          method: 'createMarkdown',
          type: JSON.stringify(err),
          err,
        })
      );
    }
  },

  async findMarkdown(req, res, next) {
    try {
      const { id } = req.params;
      const markdown = await Markdown.findById(id).exec();
      res.locals.markdown = markdown;
      next();
    } catch (err) {
      next(
        createErr({
          method: 'findMarkdown',
          type: JSON.stringify(err),
          err,
        })
      );
    }
  },

  async updateMarkdownTitle(req, res, next) {
    try {
      const { id } = req.params;
      const { title } = req.body;
      if (!title) return next();
      const updatedMarkdown = await Markdown.findByIdAndUpdate(id, {
        title,
      }).exec();
      res.locals.updatedMarkdown = updatedMarkdown;
      next();
    } catch (err) {
      next(
        createErr({
          method: 'updateMarkdownTitle',
          type: JSON.stringify(err),
          err,
        })
      );
    }
  },

  async updateMarkdownBody(req, res, next) {
    try {
      const { id } = req.params;
      const { body } = req.body;
      if (!body) return next();
      const updatedMarkdown = await Markdown.findByIdAndUpdate(id, {
        body,
      }).exec();
      res.locals.updatedMarkdown = updatedMarkdown;
      next();
    } catch (err) {
      next(
        createErr({
          method: 'updateMarkdownBody',
          type: JSON.stringify(err),
          err,
        })
      );
    }
  },

  async deleteMarkdown(req, res, next) {
    try {
      const { id } = req.params;
      const deletedMarkdown = await Markdown.findByIdAndDelete(id).exec();
      res.locals.deletedMarkdown = deletedMarkdown;
      next();
    } catch (err) {
      next(
        createErr({
          method: 'deleteMarkdown',
          type: JSON.stringify(err),
          err,
        })
      );
    }
  },

  async downloadMarkdown(req, res, next) {
    try {
      const { title, body } = req.body;
      await fs.writeFile(path.resolve(__dirname, `../data/${title}.md`), body);
      res.locals.title = title;
      next();
    } catch (err) {
      next(
        createErr({
          method: 'downloadMarkdown',
          type: JSON.stringify(err),
          err,
        })
      );
    }
  },
};

module.exports = markdownController;

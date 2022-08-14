const express = require('express');
const fs = require('fs');

const markdownController = require('../controllers/markdownController');

const Router = express.Router();

Router.get('/download', markdownController.downloadMarkdown, (req, res) => {
  //   res.status(200).download(`./data/${res.locals.title}.md`, (err) => {
  //     if (err) {
  //       if (res.headersSent) {
  //         console.log('not downloaded! yet');
  //       }
  //     } else {
  //       try {
  //         fs.unlinkSync(`./data/${res.locals.title}.md`);
  //         //file removed
  //       } catch (err) {
  //         console.error(err);
  //       }
  //     }
  //   });
  res.status(200).download(`./data/${res.locals.title}.md`);

  // res.download(
  //   path.resolve(__dirname, `../data/${res.locals.title}.md`),
  //   (err) => {
  //     console.log(err);
  //   }
  // );
  // console.log('Your file has been downloaded!');
  // try {
  //   fs.unlinkSync(path.resolve(__dirname, `../data/${res.locals.title}.md`));
  //   //file removed
  // } catch (err) {
  //   console.error(err);
  // }
  //   res.status(200).send(`${res.locals.title} downloaded!`);
});

Router.get('/', markdownController.getAllMarkdown, (req, res) => {
  res.status(200).json(res.locals);
});

Router.get('/create', markdownController.createMarkdown, (req, res) => {
  res.status(200).json(res.locals);
});

Router.get('/:id', markdownController.findMarkdown, (req, res) => {
  res.status(200).json(res.locals);
});

Router.patch(
  '/:id',
  markdownController.updateMarkdownTitle,
  markdownController.updateMarkdownBody,
  (req, res) => {
    res.status(200).json(res.locals);
  }
);

Router.delete('/:id', markdownController.deleteMarkdown, (req, res) => {
  res.status(200).json(res.locals);
});

module.exports = Router;

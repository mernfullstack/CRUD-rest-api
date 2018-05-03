const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Blog = require("../models/blog");

router.get("/", (req, res, next) => {
  Blog.find()
    .exec()
    .then(docs => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.post("/", (req, res, next) => {
  const blog = new Blog({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    username: req.body.username,
    post: req.body.post
  });
  blog
    .save()
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: "Created Blog",
        createdBlog: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.get("/:blogId", (req, res, next) => {
  const id = req.params.blogId;
  Blog.findById(id)
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json({ doc });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
      console.log("From Database", doc);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/:blogId", (req, res, next) => {
  const id = req.params.blogId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Blog.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({
        error: err
      });
    });
  res.status(200).json({
    message: "Updated blog"
  });
});

router.delete("/:blogId", (req, res, next) => {
  const id = req.params.blogId;
  Blog.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;

const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userNickname: {
    type: String,
    required: true,
    unique: false,
  },

  userAvatar: {
    type: String,
  },

  postDate: {
    type: Number,
  },

  image: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  likes: {
    type: Number,
    required: true,
  },

  comments: {
    type: Array,
    required: true,
  },

  filters: {
    type: Object,
  },

  hashtags: {
    type: Array,
  },
});

module.exports = { postModel: mongoose.model("Posts", postSchema) };

const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  members: {
    type: Array,
    required: true,
  },

  messages: {
    type: Array,
    required: true,
  },
});

module.exports = { chatModel: mongoose.model("Chats", chatSchema) };

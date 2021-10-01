const { Router } = require("express");

const User = require("../models/User");
const Post = require("../models/Post");
const Chat = require("../models/Chat");

const { ObjectId } = require("mongoose").Types;

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "df0rs0jdj",
  api_key: "446589874363134",
  api_secret: "DbS3qX6Uup-Haw5f30l1cORPQIo",
});

const multer = require("multer");

//models
const { userModel } = require("../models/User");
const { postModel } = require("../models/Post");
const { chatModel } = require("../models/Chat");

const router = Router();

router.post("/registration", async (req, res) => {
  try {
    const user = new userModel({
      name: req.body.name,
      surname: req.body.surname,
      nickname: req.body.nickname,
      email: req.body.email,
      password: req.body.password,
      registrationDate: new Date().getTime(),
    });

    await user.save();

    res.json({ msg: "User created" });
  } catch (err) {
    console.log("!!!", err);
    res.json({ msg: "Server is disconected" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email: email }).lean().exec();

  user && user.password === password
    ? res.json({ user })
    : res.json({ err: "Credentials is wrong " });
});

router.patch("/updateUser", async (req, res) => {
  const { _id, update } = req.body;

  userModel.findByIdAndUpdate({ _id }, { ...update }, async (err, result) => {
    if (err) {
      return res.json({ err: "Server error please try later" });
    } else {
      const user = await userModel
        .findOne({ _id: ObjectId(_id) })
        .lean()
        .exec();
      console.log("!!!", user);
      return res.json({ msg: "Data was updated", user });
    }
  });
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
}).single("file");

router.post("/uploadImage", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.sendStatus(500);
      console.log(err);
    }

    cloudinary.uploader.upload(
      `public/uploads/${req.file.filename}`,
      {
        public_id: `samples/ItGram/${req.file.filename}`,
      },
      (err, response) => {
        res.send(response);
      }
    );
  });
});

router.get("/posts", async (req, res) => {
  const posts = await postModel.find().lean().exec();
  console.log("!!!", posts);

  console.log("POSTS", posts);

  posts ? res.json({ posts: posts }) : res.json({ err: "Server eror" });
});

router.post("/createPost", async (req, res) => {
  const { userNickname, userAvatar, image, title, filters } = req.body;
  console.log("title", title, userNickname, image);
  try {
    const post = new postModel({
      userNickname,
      userAvatar,
      postDate: new Date(),
      image,
      title,
      likes: 0,
      comments: [],
      filters,
    });

    await post.save();
    res.json({ msg: "New post added" });
  } catch (err) {
    console.log(err);

    res.json({ err: "Server disconected" });
  }
});

router.patch("/updatePost", async (req, res) => {
  const { postId, update } = req.body;
  console.log("update", update);
  postModel.findByIdAndUpdate(
    { _id: postId },
    { ...update },
    async (err, result) => {
      err
        ? res.json({ err: "Server error try later" })
        : res.json({ msg: "Updated succsessfully" });
    }
  );
});

router.post("/getChats", async (req, res) => {
  const { userNickName } = req.body;

  console.log("!!!", userNickName);

  const chats = await chatModel.find().lean().exec();
  const userChats = chats.filter((chat) =>
    chat.members.find((member) => member.nickname === userNickName)
  );

  res.json({ chats: userChats });
});

router.post("/createChat", async (req, res) => {
  const { members } = req.body;

  try {
    const chat = new chatModel({
      members,
      messages: [],
    });

    await chat.save();
    res.json({ chat });
  } catch (err) {
    res.json({ err: "Server error, try later" });
  }
});

router.patch("/sendMsg", async (req, res) => {
  const { chatId, msg } = req.body;
  console.log(chatId);

  const chat = await chatModel.findOne({ _id: chatId }).lean().exec();
  console.log("CHAT!!!", chat);

  chatModel.findByIdAndUpdate(
    { _id: chatId },
    { messages: [...chat.messages, msg] },
    (err, r) => {
      !err ? res.json({ msg: "Sended" }) : res.json({ err: "Server error" });
    }
  );
});

router.get("/users", async (req, res) => {
  try {
    const users = await userModel.find({}).lean().exec();
    res.json({ users });
  } catch (e) {
    res.json({ msg: "Try later" });
  }
});

module.exports = router;

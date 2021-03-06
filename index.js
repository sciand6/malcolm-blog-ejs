const express = require("express");
const app = express();
require("dotenv").config();
const articleRouter = require("./routes/articles");
const mongoose = require("mongoose");
const Article = require("./models/article");
const methodOverride = require("method-override");

mongoose.connect(process.env.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.use("/articles", articleRouter);

app.get("/", async (req, res) => {
  let isAdmin = false;
  const articles = await Article.find().sort({ createdAt: "desc" });
  res.render("articles/index", { articles: articles, auth: isAdmin });
});

app.listen(5000);

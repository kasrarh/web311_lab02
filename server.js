/*

Name: Kasra Rahimian
Email : krahimian@myseneca.ca
studentId: 118335207
Assignemnt6
Date: Dec 9th 2022
 Cylic URL https://lively-gear-bear.cyclic.app
 Github : kasrarh/WEB322
*/
var port = process.env.PORT || 3000;

const exp = require("express");
const app = exp();
const path = require("path");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const multer = require("multer");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const upload = multer();

mongoose.connect(
  "mongodb+srv://krahimian:251174kr@cluster1.fyydvdc.mongodb.net/hostingCanada?retryWrites=true&w=majority"
);

var companySchema = new Schema({
  "companyName":  String,
  "address": String,
  "phone": String,
  "employeeCount": {
    "type": Number,
    "default": 0
  },
  "country": String  
});

var Company = mongoose.model("web322_companies", companySchema);

function specialChars(data) {
    const chars = /[ `~!@#$%^&*()_+=\-?]/;
    return chars.test(data)
  }

  
let users = mongoose.model("users", users_schema);
let blogs = mongoose.model("blogs");

app.engine(".hbs", handlebars.engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.use("/pictures", exp.static(path.join(__dirname, "pictures")));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", async function (req, res) {
  let title = "Blog";
  const results = await blogs.find({});
  await results.forEach(console.dir);
  for (let index = 0; index < results.length; index++) {
    var finalResults = results[index]["description"];
  }
  res.render("blog", { layout: false, title: title, findResult2: findResult2 });
});
app.get("/", function (req, res) {
  let title = "Blog";
  var blogsArray = [];
  blogs.find({}, (err, blogs) => {
    if (err) {
      console.log(err);
    } else {
      blogsArray = blogs.map((blog) => ({
        _id: blog._id,
        title: blog.title,
        description: blog.desc,
        imgUrl: blog.imgUrl,
        date: blog.date,
      }));

      res.render("blog", {
        layout: false,
        finalResult: blogsArray,
        title: title,
      });
    }
  });
});
app.get("/Blog", function (req, res) {
  let title = "Blog";
  var blogsArray = [];
  blogs.find({}, (err, blogs) => {
    if (err) {
      console.log(err);
    } else {
      blogsArray = blogs.map((blog) => ({
        _id: blog._id,
        title: blog.title,
        description: blog.desc,
        imgUrl: blog.imgUrl,
        date: blog.date,
      }));

      res.render("blog", {
        layout: false,
        finalResult: blogsArray,
        title: title,
      });
    }
  });
});
app.get("/article/:id", async function (req, res) {
  let title = "Article";

  const results = await blogs.find({});
  await results.forEach(console.dir);
  let blogTitle = results[0]["title"];
  let blogDescription = results[0]["description"];

  res.render("article", {
    title: title,
    layout: false,
    blogTitle: blogTitle,
    blogDescription: blogDescription,
  });
});
app.get("/editArticle/:_id", (req, res) => {
  const id = req.params._id;
  blogs.findOne({ _id: id }, (err, posts) => {
    if (err) {
      console.log(err);
    } else {
      res.render("editArticle", {
        layout: false,
        title: posts.title,
        _id: posts._id,
        description: posts.description,
        imgUrl: posts.imgUrl,
      });
    }
  });
});

app.post("editArticle/:_id", function (req, res) {
  const id = req.params._id;
  let title = req.body.title;
  let description = req.body.description;
  let imgUrl = req.body.imgUrl;
  const data = {
    title: title,
    desc: desc,
    imgName: imgName,
    imgUrl: imgUrl,
  };
  let updatedArticle = blogs.findOneAndUpdate(
    { _id: id },
    data,
    { new: true },
    (err) => {
      if (err) console.log("Error has been found");
      else {
        app.redirect("/articles");
      }
    }
  );
  updatedArticle
    .save()
    .then(() => {
      res.redirect("articles");
    })
    .catch((err) => {
      console.log("There was an error updating the new Article");
    });
});
app.get("/login", function (req, res) {
    res.render("login", { layout: false });
});
app.get("/register", function (req, res) {
    res.render("register", { layout: false });
});

app.post("/login", function (req, res) {
    let body = req.body;
    if (body.username && body.password && specialChars(body.username) == false) {
      res.render("blog", { layout: false });
    } else {
      var errorMessage = "Username or Password is incorect";
      res.render("login", { layout: false, errorMessage: errorMessage , username: String(body.username)});
    }
  });
app.post("/register", function (req, res) {
    let body = req.body
    if (body.name && body.username && body.password && body.phone && body.email &&
         body.password.length >=8, specialChars(body.password) == true && specialChars(body.username) == false ){
            res.render("blog", { layout: false });
         }else if(body.password.length < 8){
            var errorMessage = "password should be 8 or more characters"
            res.render("register", { layout: false, errorMessage: errorMessage, data:body });
         }else if(specialChars(body.password) == false){
            var errorMessage = "password should contain special characters"
            res.render("register", { layout: false, errorMessage: errorMessage, data:body });
         }else if(specialChars(body.username) == true){
            var errorMessage = "username should not contain special characters"
            res.render("register", { layout: false, errorMessage: errorMessage, data:body });
         }else {
            var errorMessage = "something went wrong, try again"
            res.render("register", { layout: false, errorMessage: errorMessage, data:body });
         }
})



app.listen(port);
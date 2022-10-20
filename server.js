/*

Name: Kasra Rahimian
Email : krahimian@myseneca.ca
studentId: 118335207
Assignemnt3
Date: Oct 19th 2022
 Cylic URL https://lively-gear-bear.cyclic.app
 Github : kasrarh/WEB322
*/
var port = process.env.PORT || 3000;

const exp = require("express");
const app = exp();
const path = require("path");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");

function specialChars(data) {
    const chars = /[ `~!@#$%^&*()_+=\-?]/;
    return chars.test(data)
  }

app.engine(".hbs", handlebars.engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.use("/pictures", exp.static(path.join(__dirname, "pictures")));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function (req, res) {
    res.render("blog", { layout: false });
});
app.get("/Blog", function (req, res) {
    res.render("blog", { layout: false });
});
app.get("/article/:id", function (req, res) {
    res.render("article", { layout: false });
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
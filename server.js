var express = require("express")
var app = express()
const path = require("path")
// setup a 'route' to listen on the default url path
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "views/blog.html"))
  })
  app.get("/Blog", function (req, res) {
    res.sendFile(path.join(__dirname, "views/blog.html"))
  })
  app.get("/article/:id", function (req, res) {
    res.sendFile(path.join(__dirname, "views/article.html"))
  })
  app.get("/registration", function (req, res) {
    res.sendFile(path.join(__dirname, "views/register.html"))
  })
  app.get("/login", function (req, res) {
    res.sendFile(path.join(__dirname, "views/login.html"))
  })
var port = process.env.PORT || 3000
app.listen(port)
var port = process.env.PORT || 3000; // our url is now -> http://localhost:3000

const exp = require("express");
const app = exp();
const path = require("path");

app.use("/pictures", exp.static(path.join(__dirname, "pictures")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "blog.html"));
});
app.get("/Blog", function (req, res) {
  res.sendFile(path.join(__dirname, "blog.html"));
});
app.get("/article/:id", function (req, res) {
  res.sendFile(path.join(__dirname, "article.html"));
});
app.get("/registration", function (req, res) {
  res.sendFile(path.join(__dirname, "register.html"));
});
app.get("/login", function (req, res) {
  res.sendFile(path.join(__dirname, "login.html"));
});

app.listen(port);

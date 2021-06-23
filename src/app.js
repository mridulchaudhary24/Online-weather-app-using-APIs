const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');

const static_path = path.join(__dirname,"../public");
const template_path = path.join(__dirname,"../templates");
const partials_path = path.join(__dirname,"../templates/partials");

app.set('view engine', 'hbs');
app.set('views',template_path);
hbs.registerPartials(partials_path);
app.use(express.static(static_path));

app.get("", (req,res) => {
    res.render("index");
});

app.get("/about", (req,res) => {
    res.render("about");
});

app.get("/weather", (req,res) => {
    res.render("weather");
});

app.get("*", (req,res) => {
    res.send("404error");
});

app.listen(8000, () => {
    console.log("Listening");
});
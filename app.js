const express = require("express");
const app = express();

app.use(express.json());

const songsController = require("./Controllers/songsController.js");

app.get("/", (req, res) => {
    res.status(200).send("Welcome to the TUNER APP");
});

app.use("/songs", songsController);

app.get("*", (req, res) => {
    res.status(404).send("Page Not Found");
})

module.exports = app;
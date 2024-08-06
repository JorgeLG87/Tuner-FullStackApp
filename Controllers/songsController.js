// DEPENDENCIES

const express = require("express");

const songs = express.Router();

//QUERIES

const { getAllSongs, getOneSong, createSong, deleteSong, updateSong } = require("../Queries/songs.js");

//INDEX
songs.get("/", async (req, res) => {
    const allSongs = await getAllSongs();
    if (allSongs[0]) {
        res.status(200).send(allSongs);
    } else {
        res.status(500).json({error: "server error"});
    }
});

songs.get("/:id", async (req, res) => {
    const { id } = req.params;
    const oneSong = await getOneSong(id);
    if (oneSong.id) {
        res.json(oneSong);
    } else {
        res.status(404).json(oneSong);
    }
});

songs.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const deletedSong = await deleteSong(id);
    if (deletedSong.id) {
        res.status(200).json(deletedSong);
    } else {
        res.status(400).json({error: "Song NOT Found"})
    }
})

songs.put("/:id", async (req, res) => {
    const { id } = req.params;
    const updatedSong = await updateSong(id, req.body);
    if (updatedSong.id) {
        res.status(200).json(updatedSong);
    } else {
        res.status(400).json({error: "Song NOT Found"});
    }
})

songs.post("/", async (req, res) => {
    const song = req.body;
    console.log(song);
    const newSong = await createSong(song);
    res.status(200).json(newSong);
});

module.exports = songs;
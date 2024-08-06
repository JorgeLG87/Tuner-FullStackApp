const db = require("../DB/dbConfig.js");

const getAllSongs = async () => {
    try {
        const allSongs = await db.any("SELECT * FROM songs");
        return allSongs;
    } catch (error){
        return error;
    }
};

const getOneSong = async (id) => {
    try {
        const oneSong = await db.one("SELECT * FROM songs WHERE id=$1", id);
        return oneSong
    } catch (error) {
        // console.log(error);
        return {error: "Not Found"};
    }
};

const createSong = async (song) => {
    try {
        const { name, artist, album, time, is_favorite } = song;
        const newSong = await db.one("INSERT INTO songs (name, artist, album, time, is_favorite) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [name, artist, album, time, is_favorite]);
        return newSong;
    } catch (error) {
        console.log("ERROR: ", error);
        return {error: "Wrong data type in one of the inputs"};
    }
};

const deleteSong = async (id) => {
    try {
        const deletedSong = await db.one("DELETE FROM songs WHERE id=$1 RETURNING *", id);
        // console.log(de)
        return deletedSong;
    } catch (error) {
        return error;
    }
}

const updateSong = async (id, song) => {
    try {
        const updatedSong = await db.one("UPDATE songs SET name=$1, artist=$2, album=$3, time=$4, is_favorite=$5 WHERE id=$6 RETURNING *", [song.name, song.artist, song.album, song.time, song.is_favorite, id]);
        return updatedSong;
    } catch (error) {
        return error;
    }
}

module.exports = { getAllSongs, getOneSong, createSong, deleteSong, updateSong };


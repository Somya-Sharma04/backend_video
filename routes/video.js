const express = require("express")
const Route = express.Router()
const videoController = require("../controllers/videoController")


// POST : TO Upload Video
Route.post("/upload", videoController.uploadVid);

// GET : TO Stream Video
Route.get("/videos/:id", videoController.stream);

// GET : To Download Video
Route.get("/download/:id", videoController.download);

//exports modules
module.exports = Route;
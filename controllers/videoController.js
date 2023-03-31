const express = require("express");
const multer = require("multer");
const {videoSchema} = require("../models/video.js")
const fs = require('fs');
const path = require('path');

// defining how the storage will work
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    
    // To check if the file named assests exist or not
      if(!fs.existsSync("assets")){
          fs.mkdirSync("assets");
      }

    // To check if the file named videos exist or not
      if(!fs.existsSync("assets/videos")){
          fs.mkdirSync("assets/videos");
      }

      cb(null, "assets/videos");
  },
  filename: function(req, file, cb){
      cb(null, Date.now() + file.originalname);
  }
})

// To store files in storage through multer
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb)=>{
        // listing all extension
        const filesExt = /avi|mp4|mov|avi|mkv/;
        //Checking extensions
        const ext = filesExt.test(path.extname(file.originalname).toLowerCase());
        
        if(ext){
            return cb(null,true);
        } else{
            return cb(new Error('Only vieos are allowed!'));
        }

    }

}).single("videos")


//Export Function for Uploading
exports.uploadVid = (req, res)=>{
  upload(req, res, async (err) => {
      if(err){
        res.send({
          msg: err
        });
      } else {
        if(req.file == undefined){
          res.send({
            msg: 'Error: No File Selected!'
          });
        } else {

          const Upload = new videoSchema({
            file: req.file
          })
          Upload = await Upload.save();
          res.send({
            msg: 'File Uploaded!',
            file: `uploads/${req.file.filename}`
          });
        }
      }
})};


// Export Function for Streaming
exports.stream = async(req, res)=>{
  const video = await videoSchema.findOne({_id: req.params.id})
  if(!video){
    return res.status(400).send("Video doesn't exist")
  } 

  res.send(video)
}

//Export Function for Downloading
exports.download = async(req, res)=>{
  const video = await videoSchema.findOne({_id: req.params.id})
  if(!video){
    res.status(400).send("Video doesn't exist");
  } 

  res.download(video[0].file.path)
}



//import everything that has been installed
//express, ejs and multer

const express = require('express');

const ejs = require('ejs');

//filestsyem
const fs = require('fs');

const multer = require('multer');

//Start the app here so initialize
const app = express();


//set upper engine here
//and it will be initialized to ejs
//now create view folder and in that create index.ejs file
//Whatever you write here will render on the browser
//in the json file write the start script and enter nodemon.server.js
//nodemon watches the node app, file system and automatically restarts the process
app.set('view engine', 'ejs');


//After defining the view engine, defining multer
//Multer ships with storage engines DiskStorage and MemoryStorage
//DiskStorage engine gives full control on storing files to disk
var storage = multer.diskStorage({
    //destination and filename determine where the file should be stored
    //destination--> uploaded files should be stored
    destination:function(req, file, callback){
        //declare directory
        var dir = "./uploads";

        //check if it doesn't exist
        if(!fs.existsSync(dir)){
            //then make it
            fs.mkdirSync(dir);
        }
        callback(null, dir);
    },
    filename:function(req, file, callback){
        //filename is what it should be named inside the folder
        callback(null, file.originalname);
    }
});


//initialize multer here
//multer variable , call storage property and use dot array method for multiple files
//with the array give name of the attribute 'files' initialized in the ejs file, number of files at a time
var upload = multer({storage:storage}).array('files', 12);


//When we submit the form we will be hitting this route
app.post("/upload", (req, res, next) => {
    //call the upload function here
    upload(req, res, function(err) {
        //check for error
        if(err){
            return res.send("Something gone wrong");
        }
        //else
        res.send("Upload Complete");
    });
});


//Making a get request. When we hit home route ie '/' here
//we will get request and response, arrow function
//will send the index ejs file. Extention is not required
app.get('/', (req, res) => {
    //render the text
    res.render('index');

});

app.get('/test', (req, res) => {
    //render the text
    res.render('TitlePage');

});


//listen on the port number
app.listen(4000);
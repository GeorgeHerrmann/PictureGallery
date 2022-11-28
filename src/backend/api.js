let mongoose = require('mongoose');
let express = require('express');
let JsonWebToken = require("jsonwebtoken");
let Bcrypt = require("bcryptjs");
let BodyParser = require("body-parser");
let router = express.Router();
let ComponentModel = require('./models/ComponentSchema');
let UserModel = require('./models/UserSchema');
 
const SECRET_JWT_CODE = "psmR3HuOihHKfqZymo1m";

// Connecting to database
let query = 'mongodb+srv://csci4300:csci4300@cluster0.lfzjpdo.mongodb.net/?retryWrites=true&w=majority'
 
const db = (query);
mongoose.Promise = global.Promise;
/* Initial connection */
mongoose.connect(db, { useNewUrlParser : true,
useUnifiedTopology: true }, function(error) {
    if (error) {
        console.log("Error!" + error);
    }
});

/* Creates a new Component in the database */
router.post('/save', function(req, res) {
    let newComponent = new ComponentModel();
       newComponent.Header = req.query.Header;
       newComponent.Text = req.query.Text;
       newComponent.ImgLink = req.query.ImgLink;
       newComponent.username = req.query.username;
       
       newComponent.save(function(err, data){
           if(err){
               console.log(err);
           }
           else{
               res.json(req.query);
           }
       });
    });

/* Returns all Components in the database */
router.get('/findall', function(req, res) {
    ComponentModel.find(function(err, data) {
        if(err){
            console.log(err);
        }
        else{
            res.json(data);
        }
    });  
 });

 /* Deletes based on the specific ID */
 router.post('/delete', function(req, res) {
    ComponentModel.findByIdAndDelete((req.query.id), 
    function(err, data) {
        if(err){
            console.log(err);
        }
        else{
            res.json(data);
            console.log("Data Deleted!");
        }
    });  
});

/* Updates a specific component in the data base */
router.post('/update', function(req, res) {
    ComponentModel.findByIdAndUpdate(req.query.id, 
    {Header:req.query.Header, Text:req.query.Text, ImgLink:req.query.ImgLink}, function(err, data) {
        if(err){
            console.log(err);
        }
        else{
            res.json(data);
            console.log("Data updated!");
        }
    });  
});

/* Gets a specific picture */
router.get('/find', function(req, res) {
    ComponentModel.findOne({_id : req.query.id},
    function(err, data) {
        if (err) {
            console.log(err);
        } else {
            res.json(data);
        }
    });
});

/* For creating a new user */
router.post('/user/signup', function(req, res) {
    let newUser = new UserModel();
    newUser.username = req.query.username;
    newUser.email = req.query.email;
    newUser.password = Bcrypt.hashSync(req.query.password, 10);

    newUser.save().then(user => {
        const token = JsonWebToken.sign({ id: user._id, email: user.email}, SECRET_JWT_CODE);
        res.json({ success: true, token: token});
    }).catch (err => {
        res.json({ success: false, error: err});
    });
});

/* For logging in a user */
router.post('/user/login', function(req, res) {
    UserModel.findOne({email: req.query.email}).then(user => {
        if (!user) {
            res.json({success: false, error: "User does not exist"});
        } else {
            if (!Bcrypt.compareSync(req.query.password, user.password)) {
                res.json({success: false, error: "Wrong password"});
            } else {
                const token = JsonWebToken.sign({ id: user._id, email: user.email}, SECRET_JWT_CODE);
                res.json({success: true, token: token, id: user._id, username: user.username});
            }
        }
    })
})

router.get('/verifyuser', function(req, res) {
    fetchUserByToken(req)
    .then(user => {
        res.json({success: true, username: user.username});
    }).catch(err => {
        res.json({success: false});
    })
})

function fetchUserByToken(req) {
    return new Promise((resolve, reject) => {
        if (req.headers && req.headers.authorization) {
            let authorization = req.headers.authorization;
            let decoded;
            try {
                decoded = JsonWebToken.verify(authorization, SECRET_JWT_CODE);
            } catch (e) {
                reject("Token not valid");
                return;
            }
            let userId = decoded.id;
            UserModel.findOne({_id: userId})
            .then (user => {
                resolve(user);
            })
        } else {
            reject("No token found");
        }
    })
}


module.exports = router;
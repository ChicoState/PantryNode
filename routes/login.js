
var express = require('express');
var router = express.Router();

const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost:27017/ChicoPantry'); 

var db=mongoose.connection; 
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
	console.log("connection succeeded"); 
}) 

router.get('/login', function(req, res, next) {
	res.render('signup_success', { title: 'Express' });
});

router.post('/login', function(req,res){ 
	var email =req.body.email; 
	var pass = req.body.password; 

	var data = { 
		"email":email, 
		"password":pass, 
    } 
    
    db.collection('users').findOne({'email':email}).then(function(doc){
        if(!doc)
            console.log('No record found.');
        
        console.log(doc);
    });


		
	return  res.render('./signup_success', { title: 'Express' }); 
});

module.exports = router;

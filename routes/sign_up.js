
var express = require('express');
var router = express.Router();

const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost:27017/ChicoPantry'); 

var db=mongoose.connection; 
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
	console.log("connection succeeded"); 
}) 

router.get('/register', function(req, res, next) {
	res.render('signup', { title: 'Express' });
});

router.post('/sign_up', function(req,res){ 
	var name = req.body.name; 
	var email =req.body.email; 
	var pass = req.body.password; 
	var phone =req.body.phone; 

	var data = { 
		"name": name, 
		"email":email, 
		"password":pass, 
		"phone":phone 
	} 
db.collection('users').insertOne(data,function(err, collection){ 
		if (err) throw err; 
		console.log("Record inserted Successfully"); 
			
	}); 
		
	return  res.render('./signup_success', { title: 'Express' }); 
});

module.exports = router;

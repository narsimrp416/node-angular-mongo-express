var express = require('express');
var router = express.Router();
var User = require('../models/user_model');
var bcrypt = require('bcrypt');


router.route('/user')

// GET Active User List 
.get(function(req, res) {
   var query = req.query;


   // // User Search for Drop Down list 
   // if (!!req.body.search) {
   //     query['fname'] = new RegExp(req.body.search, "i");
   //     delete query['search'];
   // }

   // // Serve Sub Admin Only Assigne User 
   // if (req.user.role === 'subadmin') {
   //     query = {
   //         "$or": [{
   //                 "assign_to": {
   //                     "$in": [req.user._id] // User assige 
   //                 }
   //             }, {
   //                 "role": {
   //                     "$in": ['admin', 'subadmin']
   //                 }
   //             }] // To SHow Other user Name in Conversation
   //     };
   // }
   User.find(query,{}, {
       sort: {
           "_id": -1
       }
   }, function(err, Users) {
       if (err) {
           res.send(err);
       }
       else if (!User) {
           res.json({
               "error": "user _id not found"
           });
       }
       else {
           res.json(Users);
       }
   });
})

// Create New User
.post(function(req, res) {
   var user = new User(req.body);
   user.save(function(err, data) {
       if (err) {
           res.send(err);
       }
       else {
       		res.json(data);
       }
   });
});

router.route('/user/:id')

// Update User Based on Id
.put(function(req, res) {

   User.findOne({
       _id: req.params.id
   }, function(err, user) {
       if (err) {
           res.send(err);
       }
       else if (!user) {
           res.json({
               "error": "user _id not found"
           });
       }
       else {

           for (prop in req.body) {
               user[prop] = req.body[prop]
           }
           // save the User
           user.save(function(err,data) {
               if (err) {
                   res.send(err);
               }
               else {
                   // User.findOne({
                   //     _id: req.params.id
                   // }, modelProjection.user, function(err, User) {
                   //     if (err) {
                   //         res.send(err);
                   //     }
                   //     else {
                   //         res.json(User);
                   //     }
                   // });
                   res.json(data);
               }
           });
       }
   });
})

// Get User details 
.get(function(req, res) {

   User.findOne({
       _id: req.params.id
   }, {}, function(err, User) {
       if (err) {
           res.send(err);
       }
       else if (!User) {
           res.json({
               "error": "user _id not found"
           });
       }
       else {
           res.json(User);
       }
   });
})


// // Delete user 

.delete(function(req, res) {

   User.remove({
       _id: req.params.id
   }, function(err, data) {
       if (err) {
           res.send(err);
       }
       else {
           res.json({"message":"user Deleted"});
       }
   });
})



// ////////////////////


// // console.log(User)

// // /* GET users listing. */
// // router.get('/', function(req, res, next) {
// //   res.send('respond with a resource');
// // });



router.post('/login',function(req,res,next){

    if (!!req.body && !!req.body.email && !!req.body.password ){
		User.findOne({"email":req.body.email}, {}, function(err, User) {
	       if (err) {
	           res.send(err);
	       }
	       else if (!User) {
	           res.json({
	               "error": "user _id not found"
	           });
	       }
	       else {

	       	   if (!!bcrypt.compareSync(req.body.password,User.password)){
	       	   		req.session.key = User;  // Session 
	           		res.json(User);
	       		} else {
	       			res.json({"message":"password didn't match"})
	       		} 
	       }
	   });
	} else {
		res.json({"message":"required field is missing email/password"})
	}
	//res.json(req.body)
})


router.get('/logout',function(req,res,next){
	delete req.session.key;
	res.json({
		"message":"logout !",
	})
})


router.get('/mydetails',function(req,res,next){
	res.json(req.session.key)
})





module.exports = router;

var express = require('express');
var router = express.Router();
var Item = require('../models/item_model');


router.route('/items')

// GET Active Item List 
.get(function(req, res) {
   var query = req.query;
   Item.find(query,{}, {
       sort: {
           "_id": -1
       }
   }, function(err, Items) {
       if (err) {
           res.send(err);
       }
       else if (!Item) {
           res.json({
               "error": "Item _id not found"
           });
       }
       else {
           res.json(Items);
       }
   });
})

// Create New Item
.post(function(req, res) {

   var Item_ = new Item(req.body);

   Item_.save(function(err, data) {
       if (err) {
           res.send(err);
       }
       else {
       		res.json(data);
       }
   });
 });

router.route('/items/:id')

// Update Item Based on Id
.put(function(req, res) {

   Item.findOne({
       _id: req.params.id
   }, function(err, Item) {
       if (err) {
           res.send(err);
       }
       else if (!Item) {
           res.json({
               "error": "Item _id not found"
           });
       }
       else {

           for (prop in req.body) {
               Item[prop] = req.body[prop]
           }
           // save the Item
           Item.save(function(err,data) {
               if (err) {
                   res.send(err);
               }
               else {
                   1
                   res.json(data);
               }
           });
       }
   });
})

// Get Item details 
.get(function(req, res) {

   Item.findOne({
       _id: req.params.id
   }, {}, function(err, Item) {

       if (err) {
           res.send(err);
       }
       else if (!Item) {
           res.json({
               "error": "Item _id not found"
           });
       }
       else {
           res.json(Item);
       }
   });
})


// // Delete Item 

.delete(function(req, res) {

   Item.remove({
       _id: req.params.id
   }, function(err, data) {
       if (err) {
           res.send(err);
       }
       else {
           res.json({"message":"Item Deleted"});
       }
   });
})

module.exports = router;

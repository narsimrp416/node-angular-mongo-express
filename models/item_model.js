var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema({
   name: {
       type: String,
       trim: true,
       required: [true, 'name required ?']
   },
   price: {
       type: String,
       trim: true,
       required: [true, 'price required ?']
   },
   details: {
       type: String,
       trim: true
   },
   image_url: {
       type: String,
       trim: true,
       required: [true, 'image required ?']
   },
   special_tag: {
       type: String,
       trim: true,
       default: "new",
       enum: ['new', 'sale', 'cool']
   }
});


// Before Save DML  
itemSchema.pre('save', function(next) {
   const now = new Date();
   this.updated_at = now;
   if (!this.created_at) {
       this.created_at = now;
   }
   next();
});

module.exports = mongoose.model('item', itemSchema);
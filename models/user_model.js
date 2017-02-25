var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
// var config = require("../config.json")


HASH=5


var Schema = mongoose.Schema;

var userSchema = new Schema({
   fname: {
       type: String,
       lowercase: true,
       trim: true,
       required: [true, 'first name required ?']
   },
   lname: {
       type: String,
       lowercase: true,
       trim: true
   },
   email: {
       type: String,
       index: true,
       unique: true,
       lowercase: true,
       trim: true,
       required: [true, 'email required ?']
   },
   password: {
       type: String,
       trim: true,
       required: [true, 'password required ?']
   },
   // active: {
   //     type: Boolean,
   //     default: false
   // },
   created_at: {
       type: Date
   },
   updated_at: {
       type: Date
   },
   // ip:{
   //     type:String
   // },
   role: {
       type: String,
       trim: true,
       lowercase: true,
       default: "user",
       enum: ['user', 'subadmin', 'admin']
   }
   // ,
   // assign_to:{
   //     type: Array,
   //     default: new Array()
   // }
});


// Before Save DML  
userSchema.pre('save', function(next) {
   const now = new Date();
   this.updated_at = now;
   if (!this.created_at) {
       this.created_at = now;
   }
   if (!!this.password) {
       this.password = bcrypt.hashSync(this.password, HASH);
   }
   next();
});

module.exports = mongoose.model('User', userSchema);
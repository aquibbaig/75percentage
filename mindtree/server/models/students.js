var mongoose = require('mongoose')
var Schema = mongoose.Schema

var studentSchema = new Schema({
  username: {type:String, max:20},
  password: {type:String, max:20},
  subjects: {type:Array, default:null}
 })

var studentModel = mongoose.model('students', studentSchema)
module.exports = studentModel

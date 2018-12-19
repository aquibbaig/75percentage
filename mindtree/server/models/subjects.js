var mongoose = require('mongoose')
var Schema = mongoose.Schema

var subjectSchema = new Schema({
  subjectname:{type:String, max:20},
  tabled:{type:Number, default:0},
  attended:{type:Number, default:0}
})

var subjectModel = mongoose.model('subjects', subjectSchema)
module.exports = subjectModel

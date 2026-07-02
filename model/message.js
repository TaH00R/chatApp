const mongoose =  require('mongoose')
const msgSchema = new mongoose.Schema({
  room:{
    type:String,
    required:true
  },
  sender:{
    type:String,
    required:true
  },
  message:{
    type:String,
    required:true
  },
 
},
{
  timestamps:true
})
module.exports = mongoose.model("Message" , msgSchema);
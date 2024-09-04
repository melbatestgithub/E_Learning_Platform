const mongoose=require('mongoose')

const UserSchema=mongoose.Schema({
  username:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  phoneNumber:{
    type:String,
    required:true
  },
  role:{
    type:String,
    default:"user"
  },
  enrolledIn:{
    type:Array,
    default:[]
  }
})
const User=mongoose.model('User',UserSchema)
module.exports=User
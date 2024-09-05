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
   enum:['student','instructor','admin']
  },
  enrolledCourses:{
    type:mongoose.Schema.Types.ObjectId,
     ref:'Courses'
  },
  educationLevel:{
    type:String,  
},
courseAssignedTo:{
    type:String, 
}
})
const User=mongoose.model('User',UserSchema)
module.exports=User
const mongoose=require('mongoose')
const InstructorsSchema=mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    educationLevel:{
        type:String,
        required:true,
    },
    courseAssignedTo:{
        type:String, 
    }
})
const Instructors=mongoose.model("Courses",InstructorsSchema)
module.exports=Instructors
const mongoose=require('mongoose')
const courseSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    courseCode:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true,
    },
    creditHour:{
        type:Number,
        required:true
    }
})
const Courses=mongoose.model("Courses",courseSchema)
module.exports=Courses
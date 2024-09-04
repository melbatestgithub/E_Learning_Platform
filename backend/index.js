const express=require('express')
const app=express()

const DbConnection=require('./config/DatabaseConnection')
const port=5600;
const CheckDBConnection=async()=>{
    try {
        app.listen(()=>{
            console.log(`Server is listening on port ${port}`)
            })
        DbConnection()
        
    } catch (error) {
        console.log("Unable to Connect")
    }
}
CheckDBConnection()

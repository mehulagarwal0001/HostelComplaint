const mongoose=require('mongoose');

const ComplaintSchema= new mongoose.Schema({
    type:String,
    hostel:String,
    room:String,
    problemDetails:String,
    timeAvailable:String,
    studentName:String,
    studentId:String,
    givenTo:String,
    status:{
        type:String,
        default:"pending"
    }
},{ timestamps: true })

module.exports= mongoose.model('complaint',ComplaintSchema);


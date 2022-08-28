const mongoose= require('mongoose');
const Complaint = require('./modals/Complaint');
const ConnectToMongo= async (uri)=>{
  await   mongoose.connect(uri,async ()=>{
        console.log("Connected")

        setInterval(() => {
          Complaint.find({status:"pending"}).then(async (data)=>{

            data.forEach( async  element => {
              
              let date1= new Date( element.updatedAt);
              let date2= Date.now();
                // console.log("Time after breaks ");
              if(date2 - date1 >1000 *60 *60 *24 * 7 ) {
               // console.log(element.id);
               await Complaint.findByIdAndUpdate(element.id,{
                  givenTo:(element.givenTo =="officer1")?"officer2": "officer3"
                })

              }

            });

          })
        }, 60000);
    })
   
}

module.exports=ConnectToMongo;

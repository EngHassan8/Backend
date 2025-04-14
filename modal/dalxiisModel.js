 
const mongoose =  require ("mongoose")


const trip = mongoose.Schema({

   Name:{
    type: String,
    
   },
   Email: {
    type: String,
    
   },
   Password: {
    type: Number,
    
   },
   Country: {
    type: String,
    
   },
   Mobile: {
    type: Number,
    
   },
   Guest:{
      type: String,
      
   },
   Adress:{
      type: String,
      
   },
   jinsi: {
      type: String,
      
   },
   CheckIn: {
      type: String,
      
   },
   dhacid: {
      type: String,
      
   }, 
   Type: {
      type: String,
      
      
   }



})


module.exports = mongoose.model("dalxiis", trip)
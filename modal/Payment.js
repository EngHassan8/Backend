const mongoose =  require ("mongoose")

const pay = mongoose.Schema({

  card:{
    type: String,
  },
  cnumber: {
    type: Number,
  },
  edata: {
    type: String,
  },
  cvv: {
    type: Number,
  }



})


module.exports = mongoose.model("Payment", pay)
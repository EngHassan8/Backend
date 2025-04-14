

const mongoose = require ("mongoose")

const adminData = mongoose.Schema({

        Email:{
            type: String,
            required: true

        },
        
        
        Password:{
            type: Number  ,
            required: true
        }

})

module.exports = mongoose.model("AdminModel", adminData)
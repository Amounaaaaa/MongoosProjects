
const mongoose=require('mongoose')
const validator = require('validator')
/*Create a person Schema*/
const personSchema=new mongoose.Schema({

    name:{
        type:String,
    },
    age:{
        type:Number,
        
        
    },
    favoriteFoods:  [{
        type: String
    }]
})
//Exporter le model 
module.exports=mongoose.model('person',personSchema)
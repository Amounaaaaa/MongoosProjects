const { response } = require("express")
const express=require("express")
const app=express()
const mongoose=require('mongoose')
const PersonModel = require("./models/Person")
require('dotenv').config({path:'config/.env'})


app.use(express.json())
/* Connect Application with database  */
mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true},{connectTimeoutMS: 10000},{poolSize: 10},{ writeConcern: { j: true
    }}
  ,(err)=>{
    if (err)
    throw err;
    else
    console.log('connect to db...')
})
/* Save person */
const person = new PersonModel({ name: 'Amounnnn' ,age:25, favoriteFoods: ["Spagetti"]});
person.save(function (err) {
  if (err) return handleError(err);   
  else console.log("user saved !")
  // saved!
});

/** Create many People with `Model.create()` */
var arrayOfPeople = [
   {name: "anas", age: 74,   favoriteFoods: ["pizza"]},
   {name: "emy", age: 76,    favoriteFoods: ["roast chicken"]},
   {name: "rayhan", age: 78, favoriteFoods: ["hamburger"]}
  ];
 

  PersonModel.create (arrayOfPeople,(err)=>{
    if (err) console.log("opps erreur")
    else
    console.log("data added")
  }
  )
  //Find persons by given name !
PersonModel.find({ name: 'anas' }).exec((err,person)=>{
    err ? console.log(err)  : console.log(" user by this name :",person)
  });

//Find persons by favoriteFoods !   
PersonModel.find({ favoriteFoods: 'hamburger' }).exec((err,person)=>{
  err ? console.log(err)  : console.log("Person has favorit food hamburger is :",person)
});
//Find persons by id  !

var id = '60a392fe86ca8444ccaf57cb';
PersonModel.findById(id, function (err, person) {
    if (err){
        console.log(err);
    }
    else{
        console.log("person with this id is  : ", person);
    }
});
// Updates person favoriteFoods : 
var id = '60a392fe86ca8444ccaf57cb';
PersonModel.findByIdAndUpdate({ _id: id }, { $push: { favoriteFoods: "hamburgggg" } },{ new: true },(err,person)=>{

    if (err){
      console.log(err);
  }
  else{
      console.log("favoriteFoods After update  : ", person);
  }
  });

  
// Updates person age : 
var name = 'anas';
PersonModel.update({ name:name }, {$set: { age: 20 }}
,(err,person)=>{

    if (err){
      console.log(err);
  }
  else{
      console.log("Person  age after update  : ", person);
  }
  });
  //Delete person by given id : 
  var id='60a39fc5187f836d4029e123'
   PersonModel.findOneAndRemove({ _id: id },(err,person)=>{
    if (err){
      console.log(err);
  }
  else{
      console.log("Person deleted with success : ", person);  
    }
   });

//Delete Many Documents   
var name='anas'
PersonModel.deleteMany({name: name },(err,person)=>{
 if (err){
   console.log(err);
}
else{
   console.log("Person deleted with success  ", person);  
 }
});
//// Chain Search Query Helpers to Narrow Search Results
 PersonModel.find({ favoriteFoods:{$in:['roast chicken']}}).sort({name: 1}).limit(2) .select({age: 0}) 
 .exec((err,person)=>{
  err ? console.log(err)  : console.log(" Result of Chain Search :",person)
});           



app.use('/api',require('./routes/person'))
app.listen(4000,()=>{
    console.log("connected")
})
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
const person = new PersonModel({ name: 'Amounnnn' });
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
    err ? console.log(err)  : console.log("liste user",person)
  });

  
app.use('/api',require('./routes/person'))
app.listen(4006,()=>{
    console.log("connected")
})
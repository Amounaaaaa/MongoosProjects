const { response } = require("express")
const express=require("express")
const app=express()
const mongoose=require('mongoose')
const Person = require("./models/Person")
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
/** Create many People with `Model.create()` */
var arrayOfPeople = [
    {name: "anas", age: 74,   favoriteFoods: ["pizza"]},
    {name: "emy", age: 76,    favoriteFoods: ["roast chicken"]},
    {name: "rayhan", age: 78, favoriteFoods: ["hamburger"]}
  ];
 

  Person.create (arrayOfPeople,(err)=>{
    if (err) console.log("opps erreur")
    else
    console.log("data added")
  }
  )
  
app.use('/api',require('./routes/person'))
app.listen(4006,()=>{
    console.log("connected")
})
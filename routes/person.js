const express=require('express')
const router=express.Router()
const Person=require('../models/Person')

/*Create and Save a Person */
router.post('/person',(req,res)=>{
    const {name,age,favoriteFoods}=req.body
    //Create a document instance using the Person :
    const person=new Person({
        name,
        age,
        favoriteFoods, 
    })
    person.save()
    .then(person=>res.status(200).json('peron add with succes'))
    .catch(err=>res.status(400).json(err))


})
/*Create Many Records with model.create()*/
router.post('/addMany',(req,res)=>{
    const {data}= req.body
    const createManyPeople=(data,(err,data)=>{
    if(err) throw err
    console.log(data)
    })})
    
module.exports=router
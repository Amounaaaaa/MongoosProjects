const { json } = require('express')
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
    .then(person=>res.status(200).json('person add with succes'))
    .catch(err=>res.status(400).json(err))


})

//request Delete
router.delete('/person/:id',(req,res)=>{
    Person.findByIdAndDelete(req.params.id)
    .then(user=>res.status(200).json(user))
    .catch(err=>res.status(400).json(err))
})


    
module.exports=router
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const mongoDB = 'mongodb://localhost:27017/emp_api'
mongoose.connect(mongoDB, {useNewUrlParser:true, useUnifiedTopology:true})


const db = mongoose.connection;
db.on('error',  console.error.bind(console, 'MONGODB error'));


const empSchema = new mongoose.Schema({
    Eid: Number,
    firstName: String, 
    age: Number
  })

 
 const Emp = mongoose.model('Emp', empSchema)
  const app = express()
   app.use(bodyParser.urlencoded({ extended: false }))
   app.use(bodyParser.json())
   const port = 4567


   const emp =[
    {   
      Eid: 1,
        firstName: "John", 
        age: 27  
      }, 
      { Eid: 2,
        firstName: "James", 
        age: 32 
      }, 
      { 
        Eid: 3,
        firstName: "Robert", 
        age: 45 
      } 
]

//const emp = [

   // {name: "John",age:27 },
   // { name: "James",age:32}
//]

app.get("/",(req, res) => {
Emp.find((err,emp) => {
  res.json(emp)
    })
})


app.get("/emp/:id",(req, res) => {
    Emp.findById(req.params.id,(err,emp) => {
    res.json(emp)
})
})



app.post("/emp",(req, res) => {
    const emp = new Emp({
        firstName:req.body.firstName,
        age:req.body.age 

    })
     emp.save((err)=>{
    
        res.json(emp)
      })
    
})

app.put("/emp/:id",(req, res) => {
    Emp.findByIdAndUpdate(req.params.id,req.body,(err) =>{
    res.json({ message: 'updated emp ${req.params.id}'})
})
})

app.delete("/emp/:id",(req, res) => {
    Emp.findByIdAndDelete(req.params.id,(err) => {
    res.json({ message: 'deleting emp ${req.params.id}'})
    })
})


app.listen(port,() => {
    console.log('Listening on port ${port}')
})

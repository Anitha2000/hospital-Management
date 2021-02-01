
const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/user')
const Patient = require('../models/patient')
const AddDoctor = require('../models/addDoctor')
const Role = require('../models/login')
//const UpdateData=require("../models/updateDoctor")
const mongoose = require('mongoose')
const { events } = require('../models/user')
const role = require('../models/login')
// const db="//localhost:27017/eventDb"
const db = "mongodb://localhost:27017/dataStore"


mongoose.connect(db, err => {
    if (err) {
        console.error('Error!!' + err)
    } else {
        console.log('connected to mongoDb')
    }
})




router.get('/', (req, res) => {
    res.send('api from route')
})

router.get('/user',(req,res)=>{
 User.find({}).exec((err,user)=>{
    if(err){
        console.log("error")
    }
    else{
        res.json(user)
    }
 })
    
})

router.get('/patient',(req,res)=>{
    Patient.find({}).exec((err,user)=>{
       if(err){
           console.log("error")
       }
       else{
           res.json(user)
       }
    })
       
   })

// router.get('/admindoctor', (req, res) => {
//     console.log("Fetchin data");
//     AddDoctor.find(function(err,doctor){
//         if(err){
//             console.log(err)
//         }
//         else{
//             console.log(doctor)
//             res.status(200).send({doctor})
//         }
//     })
// })

router.post('/signUp', (req, res) => {
    //console.log("Doctor add Itself");
    let userData = req.body
    let user = new User(userData)
    user.save((error, registeredUser) => {
        if (error) {
            console.log("error ")
        } else {
            //let payload = { subject: registeredUser._id }
            //let token = jwt.sign(payload, 'secretkey')
            let message = "Registered Successfully"
            res.status(200).send({ message ,isAdmin: userData.isAdmin})
        }
    })
})


router.post('/login', (req, res) => {
    let loginData = req.body
    let login =new Role(loginData)
    User.findOne({ userName: loginData.userName }, (error, user) => {
        if (error) {
            console.log(error)
        } else {
            if (!user) {
                res.status(401).send('Invalid UserName')
            } else
                if (user.password !== loginData.password) {
                    res.status(401).send('Invalid password')
                } else {
                    let payload = { subject: user._id }
                    let token = jwt.sign(payload, 'secretkey')
                    res.status(200).send({ token , user})
                }
        }
    })

})

router.post('/addpatient', (req, res) => {
   // console.log("Doctor add Patient")
    let patientData = req.body
    const patient = new Patient(patientData)
    patient.save((error) => {
        if (error) {
            console.log("error")
        } else {
            //let payload = { subject: registeredUser._id }
            //let token = jwt.sign(payload, 'secretkey')
            let message = "Patient data add SucessFully"
            res.status(200).send({message})
        }
    })
})


router.post("/addDoctor",(req,res)=>{
    //console.log("Admin add Doctor");
    let addDoctorData =req.body;
    const doctor = new AddDoctor(addDoctorData);
    doctor.save((error)=>{
        if(error){
            console.log("error");
        }
        else{
            let message = "Doctor data add SucessFully"
            res.status(200).send({message})
        }
    })
})

router.put("/editDoctor",(req,res,next)=>{
    //console.log("Update Doctor Details")
    let updateData =req.body;
    const updateDoctor = {
            //_id:req.body.id,
            //:req.body.userName,
            //password:req.body.password,    
            //passwordConfirm: req.body.passwordConfirm,
            name:updateData.name,
            email:updateData.email,
            phoneNumber:updateData.phoneNumber,
            //isAdmin:req.body.isAdmin
    };
    User.updateOne({_id:req.body.id},updateDoctor).then(
        ()=>{
            res.status(201).send({message:"Doctor data Update Successfully"})
        }
    ).catch((error)=>{
        res.status(400).send({error:"Updated data has been Error"})
    })
})

router.delete("/deleteDoctor",(req,res,next)=>{
    let id =req.body;
    User.deleteOne(id).then(
        ()=>{
            res.status(201).send({message:"Deleted"})
        }
    ).catch((error)=>{
        res.status(400).send({error:"Not able to delete"})
    })
})

router.put("/editPatient",(req,res,next)=>{
    //console.log("Update Patient Details")
    let updateData =req.body;
    const updatePatien= {
            //_id:req.body.id,
            //:req.body.userName,
            //password:req.body.password,    
            //passwordConfirm: req.body.passwordConfirm,
            name: updateData.name,
            email:updateData.email,
            mobileNumber:updateData.mobileNumber,
            age:updateData.age,
            gender:updateData.gender,
            city:updateData.city,
            //isAdmin:req.body.isAdmin
    };
    Patient.updateOne({_id:req.body.id},updatePatien).then(
        ()=>{
            res.status(201).send({message:"Patient data Update Successfully"})
        }
    ).catch((error)=>{
        res.status(400).send({error:"Updated data has been Error"})
    })
})

router.delete("/deletePatient",(req,res,next)=>{
    let id =req.body;
    Patient.deleteOne(id).then(
        ()=>{
            res.status(201).send({message:"Deleted"})
        }
    ).catch((error)=>{
        res.status(400).send({error:"Not able to delete"})
    })
})



module.exports = router
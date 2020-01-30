const express=require('express')
const {Moviecontroller}= require('../controller')
const {auth}=require('./../helper/auth')

const router=express.Router()

router.get('/getmovies',Moviecontroller.getmovies)


module.exports=router
const express= require('express');
const router =express.Router();
const mongoose= require('mongoose');
const passport = require('passport');
const validateProfileInput=require('../../validation/profile')
const validateExperienceInput=require('../../validation/experience')


//load profile model;

 const Profile=require('../../model/Profile');
 const User= require('../../model/User');

//get api/profile;
//current users profile
// privete
router.get('/', passport.authenticate('jwt',{session:false}),(req,res)=>{

    const errors={}
 Profile.findOne({user:req.user.id})
 .populate('user', ['name', 'avatar'])
 .then(profile=>{
     if(!profile){
         errors.noprofile="there is no profile"
         return res.status(404).json(errors)
     }
     res.json(profile);
 }).catch(err=>res.status(404).json(err))
    
})




//get api/profile/hanlde/:handle
//@dec get profie handl

//post api/profile//
 router.get('/handle/:handle',(req, res)=>{
     let errors={}
      Profile.findOne({handle:req.params.handle}).
      populate('user',['name', 'avatar']).then(profile=>{
          if(!profile){
              errors.noprofile="there no profle"
              res.status(404).json(errors)
          }
          res.json(profile)
      }).catch(err=>{
          res.status(404).json(errors)
      })

 })


 //get api/profile/ all
 // dec profile all
 router.get('/all',(req,res)=>{
     Profile.find().populate('user',['name','avatar'])
     .then(profiles=>{

        if(!profiles){
             errors.noprofile="there is no profle",
             res.status(404).json(errors)
        }
        res.json(profiles)
     }).catch(err=>res.status(404).status.json({profile:'there is no profiles'}))

 })

 // get api/profile/user/:user_id
 // @dec profile user Id

 router.get('/users/:user_id',(req, res)=>{
    let errors={}
     Profile.findOne({handle:req.params.user_id}).
     populate('user',['name', 'avatar']).then(profile=>{
         if(!profile){
             errors.noprofile="there no profle"
             res.status(404).json(errors)
         }
         res.json(profile)
     }).catch(err=>{
          console.log('user_id profile errpr', err)
         res.status(404).json(err)
     })

})



router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{

    const{errors, isValid}=validateProfileInput(req.body);
    if(!isValid){
        return res.status(400).json(errors)
    }
    //getfields;
    const profileFields={};

    profileFields.user=req.user.id;
    if(req.body.handle)profileFields.handle=req.body.handle
    if(req.body.company)profileFields.company=req.body.company
    if(req.body.website)profileFields.website=req.body.website
    if(req.body.location)profileFields.location=req.body.location
    if(req.body.bio)profileFields.bio=req.body.bio
    if(req.body.status)profileFields.status=req.body.status
    if(req.body.githubusername)profileFields.githubusername=req.body.githubusername
    if(typeof req.body.skills!=='unfined'){
        profileFields.skills=req.body.skills.split(',');

    }
    //socila
    profileFields.social={};

    
    if(req.body.youtube)profileFields.social.youtube=req.body.youtube;
    if(req.body.instagram)profileFields.social.instagram=req.body.instagram

    if(req.body.facebook)profileFields.social.facebook=req.body.facebook

    if(req.body.linkedin)profileFields.social.linkedin=req.body.linkedin
    if(req.body.twitter)profileFields.social.twitter=req.body.twitter


     Profile.findOne({user:req.user.id}).then(profile=>{
         if(profile){
             Profile.findOneAndUpdate({user:req.user.id},
                {$set:profileFields},
               
                {new:true}
                ).then(profile=>res.json(profile))
         }else{
             //check hnadle if han
             Profile.findOne({handle:profileFields.handle}).then(profile=>{
                 if(profile){
                     errors.handle="the handle alredy exis",
                     res.status(400).json(errors)
                 }
                 new Profile(profileFields).save().then(profile=>{
                     res.json(profile)
                 })

             })
         }
     })
    
})



// post api/profile/experince
// add exprence to profile

 router.post('/experience', passport.authenticate('jwt',{session:false}),(req,res)=>{
      const {errors, isValid}=validateExperienceInput(req.body);
      if(!isValid){
          return res.status(400).json(errors)
      }
     Profile.findOne({user:req.user.id}).
     then(profile=>{
         if(!profile){
             const newExp={
                 title:req.body.title,
                 company:req.body.company,
                 location:req.body.location,
                 from:req.body.from,
                 to:req.body.to,
                 current:req.body.current,
                 description:req.body.description,

             }
// add new array 
             profile.experience.unshift(newExp);
             profile.save().then(profile=>res.json(profile))
         }
     })
 })

module.exports=router;
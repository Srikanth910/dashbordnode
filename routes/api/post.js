const express= require('express');
const router =express.Router();
 const mongoose= require('mongoose');
 const passport= require('passport');
 const Post =require('../../model/Post');
 const validatePostInput= require('../../validation/posts')
 const Profile= require('../../model/Profile')



 // get api/posts

 router.get('/', (req,res)=>{
     Post.find().sort({date:-1}).then(posts=>res.json(posts)).
     catch(err=res.status(400))
 })

 // get api/posts/:id


 router.get('/:id', (req,res)=>{
    Post.findById(req.params.id).sort({date:-1}).then(posts=>res.json(posts)).
    catch(err=res.status(400))
})

 //route post api/post,
 //desc create post
 router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
     const {errors, isValid}=validatePostInput(req.body);
     if(!isValid){
         return res.status(400).json(errors)
     }
     const newPost=new Post({
        text :req.body.text,
        name:req.body.name,
        avatar:req.body.avatar,
        user:req.user.id
         
     })

     newPost.save().then(post=>res.json(post))
 })


 // detle api/post/i:id

  router.delete('/:id', passport.authenticate('jwt', {session:false}),(req,res)=>{

    Profile.findOne({user:req.user.id}).then(profile=>{
        Post.findById(req.params.id)
        .then(post=>{
            //check post owner
            if(post.user.toString()!==req.user.id){
                res.status(401).json({notauthrized:'user not  auerized'})
            }
            //
            post.remove().then(()=>res.json({msg:true}))

        })
        .catch(err=>res.status(404).json({postnotFound:"no post found"}))
    })

  })


  router.post('/like/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOne({user:req.user.id}).then(profile=>{
        Post.findById(req.params.id).then(post=>{
            if(post.likes.filter(like=>(like.user.toString()) === req.user.id).length >0){
                return res.status(400).json({msg:'already liked'})
            }
            //add user likes array
            post.likes.unshift({user:req.user.id});
            post.save().then(post=>res.json(post))
        })
        .catch(err=>res.status(404).json({postnotFound:"no post found"}))
    })
      
  })


  router.post('/unlike/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
      Profile.findOne({user:req.user.id}).then(profile=>{
          Post.findById(req.params.id).then(post=>{
              if(post.liks.filter(like=>like.user.toString()===0)){
                return res.status(400).json({notliked:'you have not yes liked'})
              }
              //remove id
              const removeIndex= post.likes
              .map(item=>item.user.toString())
              .indexOf(req.user.id);
              post.likes.splice(removeIndex,1);

              post.save().then(post=>res.json(post))

          })
          .catch(err=>res.status(404).json({postnotFound:"no post found"}))
    
      })
  })

  router.post('/comment/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{

    const {errors, isValid}=validatePostInput(req.body);
    if(!isValid){
        return res.status(400).json(errors)
    }
      Post.findById(req.params.id).then(posts=>{
    
          const newComment={
              text:req.body.text,
              name:req.body.name,
              avatar:req.body.avatar,
              user:req.user.id

          }
          posts.comments.unshift(newComment);
          posts.save().then(post=>res.json(post))
      }).catch(errors=>res.json(errors))
  })

  // remove commnet post api/comment/:id/:comment_id


  router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', {session:false}),(req,res)=>{
    const {errors, isValid}=validatePostInput(req.body);
    if(!isValid){
        return res.status(400).json(errors)
    }

     Post.findById(req.params.id).then(post=>{
        
         if(post.comments.filter(comment=>comment._id.toString()===req.params.comment_id).length===0){
             console.log('filetr', comment)
             return status(404).json({msg:"comment doest not exits"})
         }

         const removeIndex=post.comments
         .map(item=>item._id.toString())
         .indexOf(req.params.comment_id);
         //spilce array
         post.comments.splice(removeIndex, 1);
         post.save().then(post=>res.json(post))

         
     })
    

  })
module.exports=router;
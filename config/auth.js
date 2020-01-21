 const jwt =require('jsonwebtoken');
 const keys =require('./keys')
module.exports=function(req,res,next ){
    const token= req.header('x-auth-token');
    if(!token){
        return res.status(401).json({msg:'untherized'})
 9   }
 try{
     const decoded= jwt.verify(token,'secret' );
     req.user=decoded.user;
     next();
 }catch(err){
     res.status(401).json({msg:'token not valid'})
 }
}
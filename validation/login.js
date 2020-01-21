const  validator = require('validator');
const isEmpty =require('./isEmpty')
module.exports=function validateLoginInput
(data){
    let errors={};
  
    data.email=!isEmpty(data.email)?data.email:'';
    data.password=!isEmpty(data.password)?data.password:'';
    
    if(validator.isEmpty(data.email)){
        errors.isEmail="email is required"
    }
    if(!validator.isEmail(data.email)){
        errors.email="EMAIL IS invalid"
    }
    if(validator.isEmpty(data.password)){
        errors.password="password is required"
    }
    if(!validator.isLength(data.password,{min:6,max:10})){
        errors.password='min 6 requrieed'
    }
  
    return{
        errors,
        isValid:isEmpty(errors)
    }
}


const  validator = require('validator');
const isEmpty =require('./isEmpty')
module.exports=function validateRegisterInput
(data){
    let errors={};
    data.name=!isEmpty(data.name)?data.name:'';
    data.email=!isEmpty(data.email)?data.email:'';
    data.password=!isEmpty(data.password)?data.password:'';
    data.password2=!isEmpty(data.password2)?data.password2:'';


    if(!validator.isLength(data.name,{min:2,max:30})){
errors.name="name must be 2-30"
    }

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
    if(validator.isEmpty(data.password2)){
        errors.password2="password2 is required"
    }
    if(!validator.equals(data.password, data.password2)){
        errors.password2=   "password must macth"
    }
    return{
        errors,
        isValid:isEmpty(errors)
    }
}


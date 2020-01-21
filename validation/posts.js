const  validator = require('validator');
const isEmpty =require('./isEmpty')
module.exports=function validatePostInput
(data){
    let errors={};
  
    data.text=!isEmpty(data.text)?data.text:'';
   

    if(!validator.isLength(data.text,{min:2, max:30})){
        errors.text="must be 10 to 30"
    }
    
    if(validator.isEmpty(data.text)){
        errors.text="text is required"
    }
 
  
    return{
        errors,
        isValid:isEmpty(errors)
    }
}


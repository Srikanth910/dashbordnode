const  validator = require('validator');
const isEmpty =require('./isEmpty')
module.exports=function validateExprienceInput
(data){
    let errors={};
  
    data.title=!isEmpty(data.title)?data.title:'';
    data.company=!isEmpty(data.company)?data.company:'';
    data.from=!isEmpty(data.from)?data.from:'';
    
    if(validator.isEmpty(data.title)){
        errors.title="job title requird"
    }
    if(validator.isEmpty(data.company)){
        errors.company="job company requird"
    }
    if(validator.isEmpty(data.from)){
        errors.from="job from requird"
    }

  
    return{
        errors,
        isValid:isEmpty(errors)
    }
}


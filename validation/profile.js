const  validator = require('validator');
const isEmpty =require('./isEmpty')
module.exports=function validateProfileInput
(data){
    let errors={};
  
    data.handle=!isEmpty(data.handle)?data.handle:'';
    data.status=!isEmpty(data.status)?data.status:'';
    data.skills=!isEmpty(data.skills)?data.skills:'';
    
    if(!validator.isLength(data.handle,{min:2,max:40})){
        errors.handle="handlenedds bt 2 and 4 charahter"
    }
    if(validator.isEmpty(data.handle)){
        errors.handle="profile handele emapty"
    }
    if(validator.isEmpty(data.status)){
        errors.status="staus requird"
    }
    if(validator.isEmpty(data.skills)){
        errors.skills="sklis rewuid"
    }
    if(!isEmpty(data.website)){
        if(!validator.isURL(data.website)){
            errors.website="not validurl"
        }
    }
    if(!isEmpty(data.twitter)){
        if(!validator.isURL(data.twitter)){
            errors.twitter="not validurl"
        }
    }
    if(!isEmpty(data.youtube)){
        if(!validator.isURL(data.youtube)){
            errors.youtube="not validurl"
        }
    }
    if(!isEmpty(data.facebook)){
        if(!validator.isURL(data.facebook)){
            errors.facebook="not validurl"
        }
    }
    if(!isEmpty(data.instagram)){
        if(!validator.isURL(data.instagram)){
            errors.instagram="not validurl"
        }
    }

  
    return{
        errors,
        isValid:isEmpty(errors)
    }
}


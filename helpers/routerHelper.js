import Joi from '@hapi/joi'

export const schemas = {
    userNameSchema: Joi.object().keys({
        param: Joi.string().regex(/^[0-9a-zA-Z]+$/).required(),
         }),
    authSingup: Joi.object().keys({
        userName: Joi.string().regex(/^[0-9a-zA-Z]+$/).required(),
        password: Joi.string().min(1).required(),
         }),
    authSingin: Joi.object().keys({
        userName: Joi.string().regex(/^[0-9a-zA-Z]+$/).required(),
        password: Joi.string().min(1).required(),
         }),
    updatePassword: Joi.object().keys({
        newPassword: Joi.string().min(1),
         }),
    
}
export const validateParam = (param, schema)=>{
    return (req, res, next)=>{
      
        const validatorResult = schema
        .validate({param: req.params[param]})
    
        if (validatorResult.error){
            return res.status(400).json('validator gặp lỗi');
        }else{
            if (!req.value) req.value={}
            if (!req.value['params']) req.value.params={}
            req.value.params[param] = req.params[param]
            next();
        }
    }
}
export const validateBody =(schema)=>{
    return (req, res, next)=>{
      
        const validatorResult = schema.validate(req.body)
        if (validatorResult.error){
            return res.status(400).json({'message': 'User Name hoặc password không hợp lệ!'});
        } else{
            if (!req.value) req.value={}
            if (!req.value.body) req.value.body={}
            req.value.body = validatorResult.value;
            next();
        }
    }
}
export const validateName =(schema)=>{
    return (req, res, next)=>{
      
        const validatorResult = schema.validate(req.body)
        if (validatorResult.error){
            return res.status(400).json({'message': 'Tên không hợp lệ!'});
        } else{
            if (!req.value) req.value={}
            if (!req.value.body) req.value.body={}
            req.value.body = validatorResult.value;
            next();
        }
    }
}
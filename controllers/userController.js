import UserService from '../services/userService.js'
import { jwt_secret, jwt_expireIn }  from '../configs/index.js'
import JWT from 'jsonwebtoken';

const encodedToken = (userId)=>{
console.log('time expire', jwt_expireIn, jwt_secret)
    return JWT.sign({
        iss: 'Misa',
        sub: userId,  
    //   exp: new Date().setDate(new Date().getHours() + 12)
         // exp: new Date().setDate(new Date().getHours + 4)
    },
     jwt_secret,
     {
        expiresIn: jwt_expireIn
    }
    )
  }


const deleteUser = async (req, res, next)=>{
    const {userName} = req.value.params
    await UserService.deleteUser(userName)
    res.status(200).json({message: 'ok'})
}  

const getAllUsers =async(req,res,next)=>{
    const users =await UserService.getAllUsers()
    res.status(200).json({'users': users})
}


const signin =async (req, res)=>{
   
    const user = req.user

    if (!user) return res.status(403).json({message: "User không tồn tại!!!"})
    const token = encodedToken(user.userName)
  
    res.setHeader('Authorization', token)
    res.status(200).json({'user': user})
}

const signup =async (req, res, next)=>{
    console.log('start signup')
    const {userName} = req.value.body;
    const existedUser =await UserService.findByUserName(userName);
    if (existedUser){
        console.log('user da ton tai')
    return res.status(403).json({message: "Username đã tồn tại"})}
    
    const user = await UserService.create(req.value.body)
    const token = encodedToken(req.value.body.userName)
    console.log('token: ', token)
    res.setHeader('Authorization', token)
return res.status(201).json({message: "ok", user: user})
}

const signinToken = async (req, res, next)=>{
    console.log('login with jwt')
    res.status(200).json({message: "ok", user: req.user})
}

const updatePassword = async (req, res, next)=>{
   
  const {id, newPassword} = req.body;
    await UserService.updatePwd(id, newPassword)
    res.status(200).json({message: 'ok'})
}

export default {
    deleteUser,
    getAllUsers,
    signup,
    signin, 
    signinToken,
    updatePassword,
}
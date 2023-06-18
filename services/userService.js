import { User } from '../models/user.js';
import { Point } from '../models/point.js'
import { UserGame } from '../models/user_game.js'
import bcrypt from 'bcryptjs'
import { DataTypes } from 'sequelize';


const create = async (body)=>{
   console.log('start create user')
    const { userName, password} = body;
    const hashedPassword = await bcrypt.hash(password, 10)
   
    try{
    const user = await User.create({userName: userName, password: hashedPassword})
    return user;
       }
    catch(err){
        console.log('error create: ',err)
        }

}

const findByUserName = async (userName)=>{
   return await User.findOne({
        where: {userName: userName},
      })    
}

const deleteUser = async (userName)=>{
  try{  
    const user = await User.findOne({
      where: {userName: userName},
         })
    if (!user){
       throw new Error({message: 'User không tồn tại'}) 
    } 
       await user.destroy();
    }
    catch(err){
      throw  err
    }
}

const getAllUsers = async (userName) => {
     return await User.findAll({order: [['userName', 'ASC']]});;
  }


const isValidPassword = async(password, hashedPassport)=>{
    return bcrypt.compare(password, hashedPassport)}

const updatePwd = async (id, newPassword)=>{
    try{
         const user = await User.findOne({
         where: {id: id},
            })
       if (!user) throw new Error({message:'User không tồn tại'}) 
       const hashedPassword = await bcrypt.hash(newPassword, 10)
       user.password = hashedPassword;
       await user.save();
      }
      catch(err){
        throw  err
      }
      
 }

export default {
    create,
    deleteUser,
    findByUserName,
    getAllUsers,
    isValidPassword,
    updatePwd
}
import { Category } from '../models/category.js';
import { Game } from '../models/game.js';
import { ErrorReport } from '../models/error_report.js';
import gameCategoryService from './gameCategoryService.js';
import fs from 'fs'
import * as p from 'path'
import appRootPath from 'app-root-path'
import {pathStoredImage, canonicalize} from '../configs/index.js'
const  imageFolder = appRootPath + '/uploads/';

const create = async (body)=>{
  console.log('start create game service')
     const {name, path, image, categoriesId, savePath, info, imageName} = body;
       try{
    const game = await  Game.create({name: name, path: path, image: imageName??null,savePath: savePath,info: info})
 
    const body = {idGame: game.id, idCategories: categoriesId}
    await gameCategoryService.create(body)
    return game
       }
    catch(err){
        console.log('error create: ',err)
        throw err}
}

const deleteGame = async (id)=>{
  try{  
   
    const game = await Game.findOne({
      where: {id: id},
         })
    if (!game){ throw new Error('Game không tồn tại')    } 
    const imageSaved = imageFolder + game.image;
    if (fs.existsSync(imageSaved)) {
      //file exists
      fs.unlink(imageSaved , (err) => {
        if (err) {
            throw err;
        }
          console.log("Delete File successfully.", imageSaved);
    });
    }
    await game.destroy();
    return 'ok'
    }
    catch(err){
      throw err;
    }
    return 'Gặp lỗi khi xóa game trên database'
}

const findById = async (id)=>{
   return await Game.findOne({
        where: {id: id},
      })    
}

const findByName = async (name)=>{
   return await Game.findOne({
        where: {name: name},
      })    
}


const getGame = async (id) => {
    const game = await Game.findOne({
      where: {userName: id},
    });
    if(!game) {
      throw new Error({message: "User not Found"});
    }
    return game;
  }


const getAllGames = async () => {
    const games = await Game.findAll({include: Category, order: [['name', 'ASC']]});
    if(!games) {
      throw new Error({message: "Users not Found"});
    }
    return games;
  }

const increaseCount = async (req, res, next)=>{
  console.log(' increase count success')
    const {id} = req.params;
    const  game = await Game.findOne({
         where: {id: id},
       })  
       game.count++;

       await game.save();
       console.log(' increase count success')
return res.status(200).json({message: "ok"})
 }
 


const updateGame = async (id, body)=>{
  
  console.log('update game service')
  const {name, path, image, categoriesId, savePath, info, imageName=null} = body

    try{
         const game = await Game.findOne({
         where: {id: id},
            })
            
      if (!game) throw new Error('Game không tồn tại') 
      // handler change name image if gamename changed
  
      if( game.name != name && imageName!=null && game.image != null){
        const {name} = req.body
        const existGame = await Game.findOne({where: {name: name}});
        if ( existGame )  return new Error({message:'Tên Game đã tồn tại, vui lòng đổi tên khác!'}) 
        
        const oldFilePath = canonicalize(p.join(pathStoredImage, game.image))
   
       const newFilePath =canonicalize( p.join(pathStoredImage , name + p.extname(game.image)))
         
          const isExistedFile =    fs.existsSync(oldFilePath)
          if ( isExistedFile  ){
            if (imageName == null){
           
              fs.readdirSync(pathStoredImage + '/')
       
              fs.renameSync(oldFilePath, newFilePath, function (err) {
                if (err) {
                   throw err;}
                          
                })
                game.image = p.basename(newFilePath);
            } else {
              // delete old image
              fs.unlinkSync(p.join(pathStoredImage, game.image))
            }
           
          }
         
          }
          console.log()
      game.name = name;
      game.path = path;
      game.image = imageName??game.image;
      game.savePath = savePath;
      game.info = info;
   
      await game.save();
      console.log('after')
      const body = ({idGame: id, idCategories: categoriesId})
 
      await gameCategoryService.create(body);
    
      const gameResponse = await Game.findOne({where: {id: id}, include: Category})
       console.log('reponse save ganme')
       return gameResponse;
     
    }
      catch(err){
        throw  err
      }
       }

export default {
    create,
    deleteGame,
    findByName,
    findById,
    getGame,
    getAllGames,
    increaseCount,
    
    updateGame
}
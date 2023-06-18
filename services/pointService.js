
import { Point } from '../models/point.js';
import {UserGame} from '../models/user_game.js'
import { pathStoredSave } from '../configs/index.js'
import { Game } from '../models/game.js';
import  { User } from '../models/user.js'
import * as p from 'path'
import fs from 'fs'

const create = async (req, res, next) => {
  const { userId , userName, gameId, gameName,  point} = req.body

  let  idUserGame;
      console.log('start save point create new USER ID', userId)
      console.log('start save point create new GAME ID', gameId)
      const usergame = await UserGame.findOne({where: {UserId: userId, GameId: gameId }})
      console.log('start save point create new 2')
      if (usergame) {idUserGame = usergame.IdUserGame}
      else {
        
        const newUserGame = await UserGame.create({ UserId: userId, GameId: gameId})
        console.log('new UserGame:', newUserGame)
        idUserGame = newUserGame.IdUserGame
      }
      // check point name is already
      
    const existedPoint = await Point.findOne({ where: {point: point, IdUserGame: idUserGame }})
    if (existedPoint) return res.status(401).json({message: 'Tên điểm save đã có trước đó!'})

    // check length > 5
    const existedPoints = await Point.findAll({ where: {IdUserGame: idUserGame }})
    if (existedPoints.length>=5) return res.status(401).json({message: 'Vui lòng xóa bớt điểm save cũ!'})
    // create new point
    const newPoint = await Point.create({point: point, IdUserGame: idUserGame })
     return res.status(201).json({message: "ok", point: newPoint})
     }


const deletePoint = async (req, res, next) => {
   const { idUserGame, point} = req.body

      // check point name is already
      
    const existedPoint = await Point.findOne({ where: {point: point, IdUserGame: idUserGame }})
    if (!existedPoint) return res.status(401).json({message: 'Điểm savegame không tồn tại!'})
    const user_game = await UserGame.findOne({where: {IdUserGame: idUserGame}})
    const user = await User.findOne({where: {id: user_game.UserId}})
    const game = await Game.findOne({where: {id: user_game.GameId}})
     const filePath = p.join(pathStoredSave() , user.userName , game.name , point) + '.zip'
 
    await existedPoint.destroy()
    console.log(' delete file:', filePath)
    if (fs.existsSync(filePath)){ fs.unlinkSync(filePath);}
   
     return res.status(200).json({message: "ok"})
}

const updatePoint = async (req, res, next) => {
    console.log('start update point')
    const { userId , userName, gameId, gameName,  point} = req.body
   const user_game = await UserGame.findOne({where: {UserId: userId, GameId: gameId }})
   const idUserGame = user_game.IdUserGame
    const existedPoint = await Point.findOne({ where: {point: point, IdUserGame: idUserGame }})
     if (!existedPoint) return res.status(401).json({message: 'Điểm savegame không tồn tại!'})

    existedPoint.count++
  
    await existedPoint.save()
    
     return res.status(200).json({message: "ok", point: existedPoint})
}

async function getDirectorySave (userId, gameId, point) {
  const user = await User.findOne({where: {id: userId}})
  const game = await Game.findOne({where: {id: gameId}})
  console.log('check  1')
  return (p.join(url , user.userName , game.name,  point )+ '.zip')
}

const getLinkFile = async (req, res, next)=>{
  const { userId, gameId, point } = req.body 
  const user_game = await UserGame.findOne({where: {UserId: userId, GameId: gameId }})
  const idUserGame = user_game.IdUserGame
  const pointData = await Point.findOne({where: { IdUserGame: idUserGame, point: point}})
  if (!pointData) return res.status(401).send({message: 'Điểm save không tồn tại!'})
  console.log('check')
  const filePath = await getDirectorySave(userId, gameId, point)
  console.log('check', filePath)
  if (!fs.existsSync(filePath)) return res.status(401).send({message: 'File save lỗi hoặc bị xóa!'})
  console.log('file link: ', filePath)

  return res.status(200).json({path: filePath})
}
const getPoints =async(req,res,next)=>{
  const { userId, gameId } = req.params;
  const points = await UserGame.findAll({where: {UserId: userId, GameId: gameId}, include: Point})

    res.status(200).json({'points': points})
}
export default {
  create, 
  deletePoint, 
  getLinkFile,
  getPoints,
  updatePoint
}
import GameService from '../services/gameService.js'
import { Game } from '../models/game.js';

const createGame =async (req, res, next)=>{
    console.log('start create game controller', req.body)
    const {name} = req.body;
   if ((await GameService.findByName(name)))
   return res.status(403).json({message: "Game này đã tồn tại"})
   const game = await GameService.create(req.body)
return res.status(201).json({message: "ok", game: game})
}

const deleteGame = async (req, res, next)=>{
      const {id} = req.params
    await GameService.deleteGame(id)
    res.status(200).json({message: 'ok'})
}  

const getAllGame =async(req,res,next)=>{
    const games =await GameService.getAllGames()
    res.status(200).json({'games': games})
}

const updateGame = async (req, res, next)=>{
    console.log('update game controller', req.body)
    const {id} = req.params
    console.log('id:', id)
   
    const game =await  GameService.updateGame(id, req.body)
    res.status(200).json({message: 'ok', game: game})
}

export default {
    createGame,
    updateGame,
    getAllGame,
    deleteGame
}
import { Note } from "../models/notes.js";
const deleteAllNotes = async (req, res, next) => {
      await Note.destroy({ where: {},
        truncate: true});  
     return res.status(200).json({message: "ok"})
}

const getAllNotes =async(req,res,next)=>{
  const notes = await Note.findAll({order: [['createdAt', 'DESC']] })
  res.status(200).json({'notes': notes})
}


const createNote = async (req, res, next)=>{
    const { message } = req.body;
    console.log(message)
    const note = await Note.create({message: message});
    console.log(note)
    
return res.status(201).json({message: "ok", note: note})


 }

export default {
    createNote,
    getAllNotes,
    deleteAllNotes

}
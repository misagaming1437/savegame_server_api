

import { ErrorReport } from '../models/error_report.js';
import { Game } from '../models/game.js';




const deleteAllReports = async (req, res, next) => {
  
      await ErrorReport.destroy({ where: {},
        truncate: true});  
     return res.status(200).json({message: "ok"})
}

const getAllReports =async(req,res,next)=>{
console.log('start')
  const reports = await ErrorReport.findAll()
  console.log(reports);

    res.status(200).json({'reports': reports})
}
const createReportError = async (req, res, next)=>{

    const  { id }  = req.params;
    console.log(' report success id:', id)
    const { message } = req.body;
    const  game = await Game.findOne({
         where: {id: id},
       })  
      const gameName = game.name;

await ErrorReport.create({gameName: gameName, message: message});
       
       console.log(' increase count success')
return res.status(200).json({message: "ok"})
 }
export default {
    createReportError,
    getAllReports,
    deleteAllReports

}
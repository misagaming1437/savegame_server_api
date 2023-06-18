import * as p from 'path'
import multer from 'multer'
import fs from 'fs'
import { pathStoredImage, pathStoredSave } from '../configs/index.js'
import { Game } from '../models/game.js'
import { User } from '../models/user.js'


  // directory stored picture game
  const storage = multer.diskStorage({  
   
    destination: function (req, file, cb) {
        fs.mkdirSync(pathStoredImage, { recursive: true })
        cb(null, pathStoredImage)
    },
    filename: function  (req, file, cb)  {

      console.log('start get file name image function')
            let fileName = req.body['name'] + p.extname(file.originalname)
      req.body['imageName'] = fileName          
     cb(null, fileName )
    }
  })
  // directory stored Savegae
  const storageSave = multer.diskStorage({  
       destination: async function async(req, file, cb) {
        console.log('set path save storageSave Dir')
        const { userId , userName, gameId, gameName,  point: point} = req.body
        // const user =await User.findOne({where: {id: userId}})
        //       const game =await Game.findOne({where: {id: gameId}})

      const path = pathStoredSave() +'/' + userName + '/' + gameName
    
        fs.mkdirSync(path, { recursive: true })
        cb(null, path)
    },
    filename: function  (req, file, cb)  {
      const { userId , userName, gameId, gameName,  point: point} = req.body
      console.log('start get file name savegame function')
      const filename = point + p.extname(file.originalname)
      req.body['imageName'] = filename
     cb(null, filename )
    }
  })
                  


function  imagefilter (req, file, cb) {
  console.log('start image filter')
  if ( file == null ) 
  req.body['imageName']=null;
   
     // Accept images only
   if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
       req.fileValidationError = 'Only image files are allowed!';
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
}

  export const upload = multer({ storage: storage, fileFilter: imagefilter  })
  export const uploadSave = multer({ storage: storageSave })

export default {

    storage,
    upload,
    
}
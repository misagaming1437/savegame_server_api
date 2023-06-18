import dotenv from 'dotenv'
import appRootPath from 'app-root-path'

import fs from 'fs'
dotenv.config()
export const jwt_secret = process.env.JWT_SECRET
export const jwt_expireIn= process.env.JWT_EXPIRES_IN
 export function canonicalize(pathFile) {
    return pathFile.replace(/\\+/g, '/')
  }
  
  export const pathStoredImage = canonicalize(appRootPath + '/uploads');
  
  export const pathStoredSave =()=>{
    const path =appRootPath + '/usersdata';
       return canonicalize(path);
  } 


import passport from 'passport'
import { ExtractJwt } from 'passport-jwt'
import passportjwt from 'passport-jwt'
import UserService from '../services/userService.js'
import LocalStrategy from 'passport-local'
import { jwt_secret } from '../configs/index.js'



const JwtStrategy= passportjwt.Strategy
const passportConfig =()=>{
  
    //    // auth with local

    passport.use(new LocalStrategy({
        usernameField: 'userName'
      },async (  userName, password, done  )=>{
          try {
            const user = await UserService.findByUserName(userName)
            console.log('userName:', userName)
                    if (!user) {return done({"message": "User không tồn tại!"})}
            console.log('check is corret pw')
            const isCorrectPassword = await UserService.isValidPassword(password, user.password)
            if (!isCorrectPassword) return done({"message": "Sai mật khẩu!"})
            done(null, user, {message: "ok"})
          }
          catch(err){
            done(err, false)
          }
      }))
      //
      //jwt token auth
      passport.use(new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
        secretOrKey: jwt_secret
      }, async (payload, done)=>{
        console.log(payload)
        try{
          const user = await UserService.findByUserName(payload.sub)
          if (!user) return done(null, false)
          done(null, user)
        }
        catch{
          done(error, false)
        }
      }))
    
    }
 export default  passportConfig
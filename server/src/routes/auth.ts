import { Router, Request, Response, NextFunction} from "express";
import argon2 from "argon2"
import { isEmpty, validate } from "class-validator";
import cookie from "cookie"

import { User } from "../entity/User";
import auth from "../middleware/auth"
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../util/jwt-helpers";
import trim from "../middleware/trim";


//Expect back the new user profile, given there isn't one already made
//Test Cases: 1. Brand New name 2. Used name (Expect error to be readable && DB to be Okay)
//Retest after adding the isNotEmpty Validators
const register = async (req: Request, res: Response) => {
    //TODO: Make an unique checker doowop a boowop
    //TODO: Make an empty checker???
    //All wonderful ts & is to dot, when I want to switch lanes into create your own class-validator

    const {email, username, password} = req.body;
    const hashedPassword = await argon2.hash(password) //review salts and argon2 vs 2i vs 2d

    try {
        const user = await User.create({ email,
                                         username,
                                         password: hashedPassword });

        const errors = await validate(user);
        if (errors.length > 0) return res.status(400).json({errors}) //On deployment, change this
        
        const result = await user.save();
        return res.json(result);
    } catch (error) {
        console.log(error)
        return res.status(500).json(error) //On deployment, change this
    }
}

//Expect back an access token and a refresh token
//Test Cases: 1. Correct 2. Incorrect username 3.Incorrect Password
const login = async (req: Request, res: Response, _: NextFunction) =>{
    const {username, password} = req.body
    let errors: any = {}
    
    try {
        if (isEmpty(username)) errors.username = 'Username must not be empty'
        if (isEmpty(password)) errors.password = 'Password must not be empty'
        
        if(Object.keys(errors).length > 0) return res.status(400).json(errors)
        
        const user = await User.findOne({username: username})
        if (!user) return res.status(404).json({error: 'username not found'})
        
        const passwordMatches = await argon2.verify(user.password, password)
        if (!passwordMatches) return res.status(401).json({password: 'wrong password'})
        
        const accessToken = await signAccessToken(user.id)
        // const refreshToken = await signRefreshToken(user.id)
        // return res.status(200).json({ accessToken, refreshToken }) //??? Does this even make sense?? 
        
        
        //For now, just have it give back an access token which expires like never
        res.set('Set-Cookie', cookie.serialize('token', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', //Change on deployment
            sameSite: 'strict',
            maxAge: 3600, //comeback and reason throught this
            path: '/'
        }))
        
        return res.json(user)
    } catch(error) {
        console.log(error)
        return res.status(500).json(error) //On deployment, change this
    }
}

//Expect back your user profile given the user token which you've sent this request under
//Test Cases: 1. Correct 2. No Token
const me = (_: Request, res: Response, __: NextFunction) =>{//Will this work without a res.send???
    return res.json(res.locals.user)
}


const refreshToken = async (req: Request, res: Response, _: NextFunction) => {

    try {
        const { refreshToken } = req.body
        if (!refreshToken) throw new Error('BadRequest')

        const userId = await verifyRefreshToken(refreshToken)
        const accessToken = await signAccessToken(userId)
        const newRefreshToken = await signRefreshToken(userId)
        
        return res.status(200).send({ accessToken: accessToken, refreshToken: newRefreshToken })
      } catch (error) {
        
        console.log(error)
        return res.status(401).json({error: error.message}) //On deployment, change this... also review the status codes
      }
}

//I mean... you don't really need a logout route with the implementation that you're going for
// const logout = (_: Request, res: Response) =>{
//     res.set('Set-Cookie', cookie.serialize('accessToken', '', {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//         sameSite: 'strict',
//         expires: new Date(0),
//         path: '/'
//     }))
    
//     res.set('Set-Cookie', cookie.serialize('refreshToken', '', {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//         sameSite: 'strict',
//         expires: new Date(0),
//         path: '/'
//     }))

//     return res.status(200).json({success: true})
// }

const router = Router()
router.post('/register', trim, register)
router.post('/login', trim, login)
router.get('/me', auth,  me)
router.post('/refresh-token', refreshToken)
// router.get('/logout', auth, logout)


export default router

//TODO: Decide whether implementing error messages for unique username and email is something that makes sense
//TODO: On deployment, we shouldn't send back different messages for username not found and password matches
//TODO: Put the .env file in the gitignore
//TODO: Read up on best practices regarding JWT_SECRET
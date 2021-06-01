import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../util/jwt-helpers";


import { User } from "../entity/User"

//This is in need of some like, super serious testing jo
export default async (req: Request, res: Response, next: NextFunction) =>{
    try {
        const accessToken = req.headers.cookie!.slice(6) //you know that this isn't really, like... guaranteed to be there
        const userId = await verifyAccessToken(accessToken)

        const user = await User.findOne({id: userId})
        if(!user) throw new Error('Unauthenticated') //not sure when this would ever happen

        res.locals.user = user

        return next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({error: error.message}) //On deployment, change this
    }
}
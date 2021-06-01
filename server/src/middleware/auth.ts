import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../util/jwt-helpers";


import { User } from "../entity/User"

export default async (req: Request, res: Response, next: NextFunction) =>{
    try {
        if (!req.headers['authorization']) throw new Error('Unauthorized')

        const authHeader = req.headers['authorization']
        const bearerToken = authHeader.split(' ')
        const accessToken = bearerToken[1]

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
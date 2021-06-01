import "reflect-metadata"
import Express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import { createConnection } from "typeorm";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import cors from "cors"


import authRoutes from './routes/auth'
import foodRoutes from './routes/food'

(async () => {
    dotenv.config()

    await createConnection();

    const app = Express();

    //TODO: Understand each middleware you're using so you know whether you really need to be using it, and in what order
    app.use(Express.json());
    app.use(morgan('dev'));
    app.use(cookieParser())
    app.use(cors({
        credentials: true,
        origin: process.env.ORIGIN!,
        optionsSuccessStatus: 200
    }))


    app.get('/', (_: Request, res: Response, __: NextFunction) => res.send('Hello World'))
    app.use('/auth', authRoutes) //maybe change name to /api/auth???
    app.use('/food', foodRoutes)

    const PORT = process.env.PORT;
    app.listen(PORT, async ()=>{
        console.log(`server started on port: ${PORT}`)
    })
})();

//TODO: Change the database on ORMConfig
//TODO: Learn express
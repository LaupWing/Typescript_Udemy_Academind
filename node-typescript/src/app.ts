import express, {Request, Response, NextFunction} from 'express'
const app = express()
import todoRoutes from './routes/todos'
import {json} from 'body-parser'
app.use(json())
app.use('/todos', todoRoutes)
app.use((err: Error, req: Request, res: Response, next: NextFunction)=>{
   res.status(500).json({message: err.message})
})
app.listen(3000)

import express from 'express'
import userRouter from './Routers/routs.js'
const PORT = process.env.PORT || 8000
const app  = express()

console.log(userRouter.get)

app.use(express.json())

app.use(userRouter)

app.listen(PORT,() => console.log(`${PORT} active........`))
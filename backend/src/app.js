import express from 'express'
import cors from 'cors'
const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    Credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))


import festiveRoute from './routes/festivesuggestion.routes.js'
import googleAuthRoute from './routes/googleAuth.route.js'
import userRoute from './routes/user.routes.js'

app.use('/api/festivals', festiveRoute)
app.use('/api/users', userRoute)
app.use('/api/auth', googleAuthRoute)

export {app}
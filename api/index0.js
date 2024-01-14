const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const User = require('./models/User')

dotenv.config()
mongoose.connect(process.env.MONGO_URL)
// mongoose.connect(process.env.MONGO_URL, (err) => {
//     if (err) throw err
// })
const jwtSecret = process.env.JWT_SECRET
const bcryptSalt = bcrypt.genSaltSync(10)

const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
    // origin: 'http://localhost:5173',
}))

app.get('/test', (req, res) => {
    res.json('test ok')
})

app.get('/profile', (req, res) => {
    const token = req.cookies?.token
    console.log('token in request:', token)
    if (token) {
        jwt.verify(token, jwtSecret, {}, (err, userData) => {
            if (err) throw err
            res.json({userData})
            console.log('userData:', userData)
        })
    } else {
        res.status(401).json('no token')
    }
    
})

app.post('/login', async (req, res) => {
    const {username, password} = req.body
    const foundUser = await User.findOne({username})
    if (foundUser) {
        const passOk = bcrypt.compareSync(password, foundUser.password)
        if (passOk) {
            jwt.sign({ userId: foundUser._id, username }, jwtSecret, {}, (err, token) => {
                // res.cookie('token', token).json({
                //     id: foundUser._id,
                // })
                res.cookie('token', token, { sameSite: 'none', secure: true }).json({
                    id: foundUser._id,
                })
            })
        }
    }
})

app.post('/register', async (req, res) => {
    const { username, password } = req.body
    try {
        const hashedPassword = bcrypt.hashSync(password, bcryptSalt)
        const createdUser = await User.create({ 
            username: username, 
            password: hashedPassword,
        })
        jwt.sign({ userId: createdUser._id, username }, jwtSecret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token, {sameSite: 'none', secure: true}).status(201).json({
                id: createdUser._id, 
            })
        })
    } catch (err) {
        if (err) throw err
        res.status(500).json('error')
    }
})

app.listen(4040)
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const User = require('./models/User')
const Message = require('./models/Message')
const ws = require('ws')

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

// Middleware to decode and verify the token
app.use((req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, jwtSecret, {}, (err, userData) => {
            if (err) {
                res.status(401).json({ error: 'Invalid token' });
            } else {
                req.userData = userData;
                next();
            }
        });
    } else {
        next();
    }
});

async function getUserDataFromRequest(req) {
    return new Promise((resolve, reject) => {
        const token = req.cookies?.token
        if (token) {
            jwt.verify(token, jwtSecret, {}, (err, userData) => {
                if (err) throw err
                resolve(userData)
            })
        } else {
            reject('no token')
        }
    })
}

app.get('/test', (req, res) => {
    res.json('test ok')
})

app.get('/messages/:userId', async (req, res) => {
    const {userId} = req.params
    const userData = await getUserDataFromRequest(req)
    const ourUserId = userData.userId
    const messages = await Message.find({
        sender:{$in:[userId,ourUserId]},
        recipient:{$in:[userId,ourUserId]},
    }).sort({createdAt: 1})
    res.json(messages)
})

app.get('/people', async (req, res) => {
    const users = await User.find({}, {'_id': 1, username: 1})
    res.json(users)
})

app.get('/profile', (req, res) => {
    const token = req.cookies?.token
    console.log('token in request:', token)
    if (token) {
        jwt.verify(token, jwtSecret, {}, (err, userData) => {
            if (err) throw err
            res.json({userData})
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
                    token, id: foundUser._id,
                })
                // Set the token in the response header
                res.setHeader('Authorization', token);
            })
        }
    }
})

app.post('/logout', (req, res) => {
    res.cookie('token', '', { sameSite: 'none', secure: true }).json('ok')
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
                token, id: createdUser._id, 
            })
            // Set the token in the response header
            res.setHeader('Authorization', token);
        })
    } catch (err) {
        if (err) throw err
        res.status(500).json('error')
    }
})

const server = app.listen(4040)

const wss = new ws.WebSocketServer({server})
wss.on('connection', (connection, req) => {

    function notifyAboutOnlinePeople() {
        Array.from(wss.clients).forEach(client => {
            client.send(JSON.stringify({
                online: Array.from(wss.clients).map(c => ({ userId: c.userId, username: c.username }))
            }))
        })
    }

    connection.isAlive = true

    connection.timer = setInterval(() => {
        connection.ping()
        connection.deathTimer = setTimeout(() => {
            connection.isAlive = false
            clearInterval(connection.timer)
            connection.terminate()
            notifyAboutOnlinePeople()
            console.log('dead')
        }, 1000);
    }, 5000)

    connection.on('pong', () => {
        clearTimeout(connection.deathTimer)
    })

    // read username and id from the cookie for this connection
    const cookies = req.headers.cookie
    if (cookies) {
        const tokenCookieString = cookies.split(';').find(str => str.startsWith('token='))
        if (tokenCookieString) {
            const token = tokenCookieString.split('=')[1]
            if (token) {
                jwt.verify(token, jwtSecret, {}, (err, userData) => {
                    if (err) throw err
                    const {userId, username} = userData
                    connection.userId = userId
                    connection.username = username
                })
            }
        }
    }

    connection.on('message', async (message) => {
        const messageData = JSON.parse(message.toString())
        const {recipient, text} = messageData
        if (recipient && text) {
            const messageDoc = await Message.create({
                sender: connection.userId,
                recipient,
                text,
            })
            // [...wss.clients]
            //     .filter(c => c.userId === recipient)
            //     .forEach(c => c.send(JSON.stringify({
            //         text, 
            //         sender: connection.userId,
            //         _id: messageDoc._id
            //     })))
            Array.from(wss.clients)
                .filter(c => c.userId === recipient)
                .forEach(c => c.send(JSON.stringify({
                    text, 
                    sender: connection.userId,
                    recipient,
                    _id: messageDoc._id
                }))) ;
        }
    })

    // notify everyone about online people (when someone connects)
    // [...wss.clients].forEach(client => {
    //     client.send(JSON.stringify({
    //         online: [...wss.clients].map(c => ({ userId: c.userId, username: c.username }))
    //     }))
    // })
    notifyAboutOnlinePeople()
})


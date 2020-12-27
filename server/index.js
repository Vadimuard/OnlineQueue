const express = require('express')
const app = express()
const path = require('path')
const port = 3332
const clientPath = "../client/"
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(clientPath));

const db = {
    users: [
        {
            username: "johnwick",
            fullname: "John Wick",
            password: "omegaluler"
        },
        {
            username: "vadym",
            fullname: "Vadym Shkurko",
            password: "vadimuard"
        },
        {
            username: "nazar",
            fullname: "Nazar Derevoriz",
            password: "thesilentist"
        },
        {
            username: 'hrobak_billy',
            fullname: 'Sheck Wes',
            password: 'HROBAK'
        },
        {
            username: 'newuser',
            fullname: 'Some New User Here',
            password: 'IMUSER'
        },
        {
            username: 'NiP_sux',
            fullname: 'user new',
            password: 'FLUSHACHEATER'
        },
        {
            username: 'omega',
            fullname: 'omega lul',
            password: 'alskdam'
        }
    ],
    timeNotes: [
        {
            day: "friday",
            time: "13",
            user: "johnwick"
        },
        {
            day: "tuesday",
            time: "9",
            user: "vadym"
        },
        {
            day: "monday",
            time: "11",
            user: "nazar"
        },
        {
            day: "friday",
            time: "12",
            user: "johnwick"
        }
    ]
}

app.get('/timenotes', (req, res) => {
    res.json(db.timeNotes)
})

app.post('/timenotes', (req, res) => {
    const data = req.body
    db.timeNotes.push(data)
    res.status(200).send()
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, clientPath, "login.html"))
})

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, clientPath, "signup.html"))
})

app.post('/login', (req, res) => {
    const user = req.body
    for (let i = 0; i < db.users.length; i++) {
        if (db.users[i].username.toLowerCase() == user.username.toLowerCase()) {
            if (user.password == db.users[i].password) {
                res.send(true)
            }
        }
    }
    res.send(false)
})

app.post('/signup', (req, res) => {
    const user = req.body
    for (let i = 0; i < db.users.length; i++) {
        if (db.users[i].username.toLowerCase() == user.username.toLowerCase()) {
            res.send(false)
        }
    }
    db.users.push(user)
    console.log(user)
    res.send(true)
})

app.get('/', (req, res) => {
    res.render("index")
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})
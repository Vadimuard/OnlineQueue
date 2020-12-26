const express = require('express')
const app = express()
const path = require('path')
const port = 3000
const clientPath = "../client/"
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(clientPath));

const db = {
    users: [
        {
            username: "johnwick",
            password: "omegaluler"
        },
        {
            username: "vadym",
            password: "vadimuard"
        },
        {
            username: "nazar",
            password: "thesilentist"
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

app.get('/', (req, res) => {
    res.render("index")
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})
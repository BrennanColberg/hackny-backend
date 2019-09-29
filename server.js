const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const dotenv = require('dotenv')

dotenv.config()
const app = express()
let db = undefined

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  db.collection('logs')
    .find({})
    .toArray()
    .then(logs => res.json(logs))
    .catch(err => console.error(err))
})

MongoClient.connect(
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_DOMAIN}/test?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) return console.log(err)
    db = client.db('test')
    app.listen(3001, () => console.log('listening on port 3001'))
  }
)

const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const app = express()
app.use(bodyParser.json({ limit: '1mb' }))
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(express.static('./dist'))

var userData = { kano: '123' }
const jwtKey = 'xiaobai'
app.post('/login', (req, res) => {
  console.log(req.body)
  const {
    account,
    password
  } = req.body

  if (userData[account] == null) {
    return new Error('错误')
  }
  const isMatch = userData[account] === password
  console.log(userData[account], password)
  if (!isMatch) {
    return new Error('cuowu')
  }
  const token = jwt.sign({ _id: account }, jwtKey)
  console.log(token)
  res.send(token)
})

app.post('/userinfo', (req, res) => {
  console.log(req.headers.authorization.slice(7))
  const token = (req.headers.authorization || '').slice(7)
  try {
    var parseToken = jwt.verify(token, jwtKey)
  } catch (err) {
    res.status(401)
    throw new Error(err)
  }
  console.log(parseToken)
  if (!parseToken.account === req.body.account) {
    res.status(401)
  } else {
    res.send('token正确')
  }
})

app.listen(8998, () => {
  console.log('server running at http://127.0.0.1:8998')
})

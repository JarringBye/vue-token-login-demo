const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

const app = express()
app.use(bodyParser.json({ limit: '1mb' }))
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(express.static('./dist'))
// 相当于用户账号密码存储库
var userData = { kano: '123' }
// jwt密钥
const jwtKey = 'xiaobai'

app.post('/login', (req, res) => {
  const {
    account,
    password
  } = req.body

  if (userData[account] == null) {
    res.status(403).send('no this account')
    return new Error('没有此账号')
  }
  const isMatch = userData[account] === password
  if (!isMatch) {
    res.status(403).send('account or password is wrong')
    return new Error('用户名或密码错误')
  }
  const token = jwt.sign({ _id: account }, jwtKey) // 生成token
  res.send(token)
})

app.post('/userinfo', (req, res) => {
  const token = (req.headers.authorization || '').slice(7)
  try {
    var parseToken = jwt.verify(token, jwtKey)
  } catch (err) {
    res.status(401) // token验证不成功，返回401状态码
    throw new Error(err)
  }
  if (!parseToken.account === req.body.account) {
    res.status(401)
  } else {
    return new Error('token验证失败')
  }
})

app.listen(8998, () => {
  console.log('server running at http://127.0.0.1:8998')
})

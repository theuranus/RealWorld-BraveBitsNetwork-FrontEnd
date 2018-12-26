const express = require('express')
const app = express()
const port = 8080
const path = require('path')
const bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}))
app.use(express.static(path.join(__dirname + '/dist/')))

app.get('*', (req, res) => {
    return res.sendFile(path.join(__dirname + '/dist/index.html'))
})

app.listen(port, () => {console.log('server is ready')})
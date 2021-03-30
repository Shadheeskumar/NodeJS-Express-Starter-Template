require('dotenv').config()

const cors = require('cors');
const express = require('express')
const app = express()

app.use(cors());
app.options('*', cors());

const folderRouter = require('./api/folder/folder.router')

app.use(express.json())

app.use('/api/folder', folderRouter)

app.listen(process.env.APP_PORT, () => {
    console.log("Server Initiated. PORT: ", process.env.APP_PORT)
})
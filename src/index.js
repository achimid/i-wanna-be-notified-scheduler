require('dotenv').config()

const consumerInit = require('./scheduler/scheduler-consumer')
const { startSchedulers } = require('./scheduler/scheduler-service')
const healthcheck = require('./config/healthcheck')

const cors = require('cors')
const express = require('express')
const app = express()


consumerInit()
startSchedulers()


app.use(cors())
app.use(express.json())
app.disable('x-powered-by')
app.use('/api/v1', healthcheck)


app.listen(process.env.PORT)


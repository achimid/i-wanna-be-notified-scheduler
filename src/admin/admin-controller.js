const router = require('express').Router()
const { OK } = require('http-status-codes')
const service = require('../scheduler/scheduler-service')


router.get('/restart', (req, res) => {
    service.restartSchedulers().then(() => res.status(OK).send())
})


module.exports = router
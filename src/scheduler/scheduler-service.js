const cron = require('node-cron')
const Scheduler = require('./scheduler-model')
const producer = require('./scheduler-producer')

const cronTimeDefault = process.env.CRON_TIME_DEFAULT
let tasksList = new Set()

const findAllRegularity = () => Scheduler.many(Model => Model
    .find()
    .select('regularity')
    .distinct('regularity')
    .lean())

const findByRegularity = (regularity) => Scheduler.many(Model => Model
    .find({regularity, disabled: {$ne: false}})
    .sort('regularity')
    .lean())

const postNewExecution = async (monitoring) => {
    console.log('Adding new execution on queue')
    producer.postExecution({...monitoring, monitoringId: monitoring._id})
    console.log('New execution posted', `[${monitoring.regularity}]`, monitoring._id, monitoring.url)
}

const executeScheduler = (regularity) => async () => {
    const monitorings = await findByRegularity(regularity)
    monitorings.map(postNewExecution)
}

const startSchedulers = async () => {
    const regularities = await findAllRegularity()
    const regularitiesDistinct = [...new Set(regularities)]
    regularitiesDistinct.map(regularity => {
        const cronTime = regularity || cronTimeDefault

        console.log('Creating new scheduler', cronTime)
        tasksList.add(cron.schedule(cronTime, executeScheduler(regularity)))

        console.log('First execution')
        executeScheduler(regularity)()
    })
}

const stopSchedulers = () => {
    tasksList.forEach(task => task.stop())
    tasksList = new Set()
}

const restartSchedulers = async () => {
    console.log('Restarting schedulers')
    stopSchedulers()
    startSchedulers()
}

module.exports = {
    startSchedulers,
    stopSchedulers,
    restartSchedulers
}
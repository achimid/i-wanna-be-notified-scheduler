const queue = require("../utils/queue")
const service = require('./scheduler-service')

module.exports = async () => {
    console.info('Starging execution consumer')
    
    queue.consumeFromQueueWithAck("RESTAR_SCHEDULER_EVENT", (message, ack) => {
        const data = JSON.parse(message.content.toString())
        service.restartSchedulers(data).then(ack)
    })

}

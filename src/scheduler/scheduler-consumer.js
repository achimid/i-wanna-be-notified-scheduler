const queue = require("../utils/queue")
const service = require('./scheduler-service')

module.exports = async () => {
    console.info('Starging execution consumer')
    
    queue.consumeFromQueue("RESTAR_SCHEDULER_EVENT", () => service.restartSchedulers())

}

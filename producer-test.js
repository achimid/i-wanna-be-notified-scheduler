require('dotenv').config()

const queue = require("./src/utils/queue")
const Monitoring = require('./src/scheduler/scheduler-model')

queue.sendToQueue("RESTAR_SCHEDULER_EVENT", null)

const data = []


data.push({
    url: 'https://horriblesubs.info/',
    scriptTarget: "target = []; async function click(){return Promise.resolve(Array.from(document.querySelectorAll('.episode-info-tabs')).forEach(e=>e.lastChild.click()))}async function getLink(){return Array.from(document.querySelectorAll('.episode-info-links')).forEach(e=>{const r=Array.from(e.childNodes).find(e=>'Drive ''===e.innerText);target.push(void 0!==r?r.href:'')}),Promise.resolve(target.toString)}target=[],click().then(getLink);",
    scriptContent: [
        "target[0]",
        "target[1]",
        "target[2]",
        "target[3]",
        "target[4]"
    ],
    regularity: '*/1 * * * *',
    options: {        
        useJquery: true
    }
})

Promise.all(data.map((v) => new Monitoring(v).save().then(() => console.log('salvo'))))

const mongoose = require("mongoose")

const schema = mongoose.Schema({
    url: { 
        type: String,
        required: true
    },
    scriptTarget: {
        type: String
    },
    scriptContent: [{
        type: String
    }],
    filter: {
        threshold: { Number },
        words: [{ type: String }]
    },
    regularity: { 
        type: String 
    },
    disabled: {
        type: Boolean
    },
    executionOptions: {
        timeout: { type: Number },
        waitUntil: { type: String },
        enableUserAgentRandom: { type: Boolean },
        useJquery: { type: Boolean },
        scriptTagUrl: { type: String },
        waitTime: { type: Number },
        printscreen: { type: Boolean },
        printscreenFullPage: { type: Boolean },
        levelMax: { type: Number },
        proxy: { type: String }
    },
}, { versionKey: false, timestamps: true })

const Monitoring = mongoose.model("monitorings", schema)

module.exports = Monitoring

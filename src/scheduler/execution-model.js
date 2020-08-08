const mongoose = require("mongoose")

const schema = mongoose.Schema({
    url: { 
        type: String, 
        required: true
    },
    scriptTarget: { 
        type: String
    },
    filter: {
        threshold: Number,
        words: [{
            type: String
        }]
    },
    scriptContent: [{ 
        type: String
    }],
    options: { 
        timeout: { type: Number },
        waitUntil: { type: String },
        enableUserAgentRandom: { type: Boolean },
        useJquery: { type: Boolean },
        scriptTagUrl: { type: String },
        waitTime: { type: Number },
        printscreen: { type: Boolean },
        printscreenFullPage: { type: Boolean },
        levelMax: { type: Number }
    },    
}, { versionKey: false, timestamps: true })

const Execution = mongoose.model("executions", schema)
module.exports = Execution
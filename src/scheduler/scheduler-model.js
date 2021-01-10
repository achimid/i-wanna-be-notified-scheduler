const config = require('../config/database-config')
const mongoose = require('../config/mongoose-multi-db')

const schema = mongoose.Schema({
    url: { 
        type: String,
        required: true
    },
    scriptTarget: { 
        type: String
    },
    scriptNavigate: { 
        type: String
    },
    scriptContent: {
        type: [{ type: String }],
        default: undefined    
    },
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
        proxy: { type: String },
        temporary: { type: Boolean },
        filterDomain: { type: Boolean }
    },
}, { versionKey: false, timestamps: true })

module.exports = mongoose.model('monitorings', schema, config)

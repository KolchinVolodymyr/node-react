const {Schema, model} = require('mongoose')

const worksitesSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    clientID: {
        type: String
    }
})

module.exports = model('Worksites', worksitesSchema)
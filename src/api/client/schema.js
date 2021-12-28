const {Schema, model} = require('mongoose');

const clientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    contactPerson: {
        type: Number,
        required: true
    },
    client: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    worksites: {
        items: [
            {
                WorksitesId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Worksites',
                    required: true
                }
            }
        ]
    }

})

module.exports = model('Client', clientSchema)
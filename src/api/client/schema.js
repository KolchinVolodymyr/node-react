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
        type: Boolean,
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
clientSchema.methods.addToWorksites = function(Worksites) {
    const items = [...this.worksites.items];
    const idx = items.findIndex(c => {
        return c.WorksitesId.toString() === Worksites._id.toString();
    })
    if (idx >= 0) {
        // items[idx].count = items[idx].count + 1;
    } else {
        items.push({
            WorksitesId: Worksites._id,
        })
    }

    this.worksites = {items};
    return this.save();
}
clientSchema.methods.deleteWorksites = function(Worksites) {
    const items = [...this.worksites.items];
    const idx = items.findIndex(c => c.WorksitesId.toString() === Worksites.toString());
   console.log('idx', idx);
    // items.filter(c => c.WorksitesId.toString() !== Worksites.toString());
    console.log('items',items);
    if (items[idx] !== -1) {
        items = items.filter(c => c.WorksitesId.toString() !== Worksites.toString());
    } else {
        items[idx].count--;
    }

    this.worksites = {items};
    return this.save();
}

module.exports = model('Client', clientSchema)
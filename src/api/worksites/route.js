'use strict';

const MODEL_NAME = 'worksites';
const Worksites = require('./schema');
const Client = require('../client/schema');

module.exports = [
    {
        method: 'GET',
        path: `/${MODEL_NAME}/list`,
        options: {
            auth: {
                mode: 'try',
                strategy: 'session60'
            }
        },
        handler: async function (request, h) {
            try {
                const worksites = await Worksites.find();
                return h.response(worksites).code(200).takeover();
            } catch (e) {
                console.log(e);
            }
        }
    },
    {
        method: 'POST',
        path: `/${MODEL_NAME}`,
        options: {
            auth: {
                mode: 'try',
                strategy: 'session60'
            },
        },
        handler: async function (request, h) {
            const worksites = new Worksites({
                name: request.payload.name,
                address: request.payload.address,
                type: request.payload.type,
                status: request.payload.status,
            });
            worksites.save();
            if (!worksites) {
                return h.response({message: 'An error occured, please try again later!'})
            }
            return h.response({message: 'Course successfully created !!!'}).code(201).takeover();
        }
    },
    {
        method: 'GET',
        path: `/${MODEL_NAME}/{id}/edit`,
        options: {
            auth: {
                mode: 'try',
                strategy: 'session60'
            }
        },
        handler: async function (request, h) {
            try {
                const worksites = await Worksites.findById(request.params.id);
                const client = await Client.findById(worksites.clientID);
                const clientList = await Client.find();
                // console.log('worksites', worksites);
                // console.log('client', client);
                // client.worksites.items.forEach(el => {
                //     console.log('el', el.WorksitesId);
                //     console.log('worksites.clientID', worksites.clientID);
                //     // client.deleteWorksites(el.WorksitesId);
                // })
                return h.response({worksites, client, clientList}).code(200).takeover();
            } catch (e) {
                console.log(e);
            }
        }
    },
    {
        method: 'PUT',
        path: `/${MODEL_NAME}/{id}/edit`,
        options: {
            auth: {
                mode: 'try',
                strategy: 'session60'
            },
        },
        handler: async function (request, h) {
            try {
                await Worksites.findByIdAndUpdate(request.payload.id, request.payload);
                const worksites = await Worksites.findById(request.params.id);
                // console.log('request.payload', request.payload);
                const client = await Client.findById(worksites.clientID);
                console.log('client', client);
                // console.log('clientID', request.payload.clientID);
                // console.log('currentClientID', request.payload.currentClientID);
                const currentClient = await Client.findById(request.payload.currentClientID);
                if(currentClient !== null) {
                    await currentClient.deleteWorksites(worksites)
                }
                console.log('currentClient', currentClient);
                if(client !== null) {
                    await client.addToWorksites(worksites);
                }
                return h.response({message: 'Data changed successfully!'}).code(200).takeover();
            } catch (e){
                console.log(e);
            }
        }
    },
    {
        method: 'DELETE',
        path: `/${MODEL_NAME}/remove`,
        options: {
            auth: {
                mode: 'try',
                strategy: 'session60'
            }
        },
        handler: async function (request, h) {
            try {
                await Worksites.deleteOne({_id: request.payload.id});
                return h.response({message: 'Worksites deleted!'});
            } catch (e){
                console.log(e);
            }
        }
    }
]




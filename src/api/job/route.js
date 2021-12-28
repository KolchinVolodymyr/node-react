'use strict';

const MODEL_NAME = 'job';
const Job = require('./schema');
const Joi = require("@hapi/joi");

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
            const job = await Job.find();
            return h.response(job).code(200).takeover();
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
                const job = await Job.findById(request.params.id);
                return h.response(job).code(200).takeover();
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
//            validate: {
//                payload: Joi.object({
//                    name: Joi.string().min(3).required().error(new Error('Minimum name length 3 characters')),
//                    address: Joi.string().min(3).required().error(new Error('Minimum name length 3 characters')),
//                    phone: Joi.number().integer().required().error(new Error('Enter the correct phone')),
//                    contactPerson: Joi.number().integer().required().error(new Error('Enter the correct Contact Person'))
//                }),
//                options: {
//                    allowUnknown: true,
//                },
//                failAction: (request, h, err) => {
//                    return h.response({message: err.output.payload.message}).code(400).takeover();
//                }
//            },
        },
        handler: async function (request, h) {
            const job = new Job({
                worksiteID: request.payload.worksiteID,
                type: request.payload.type,
                hazardousMaterials: request.payload.hazardousMaterials,
                serviceFee: request.payload.serviceFee,
                startDate: request.payload.startDate,
                endDate: request.payload.endDate,
            });
            job.save();
            if (!job) {
                return h.response({message: 'An error occured, please try again later!'})
            }
            return h.response({message: 'Course successfully created !!!'}).code(201).takeover();
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
                await Job.deleteOne({_id: request.payload.id});
                return h.response({message: 'Job deleted!'});
            } catch (e){
                console.log(e);
            }
        }
    }

]
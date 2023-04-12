/**
 * Abstract class Publisher
 * @class Publisher
 */

 const nats = require('node-nats-streaming');
 const Subjects = require('./subjects');

 class Publisher {

    // normal abstract properties
    subject = Subjects;

    // private property
    #client;

    constructor(client){
        if(this.constructor === Publisher){
            throw new Error('Publisher cannot be instatiated');
        }
        this.#client = client;
    }

    publish(data){

        // make this return a new promise
        return new Promise((resolve, reject) => {

            this.#client.publish(this.subject, JSON.stringify(data), (err) => {

                if(err){
                    return reject(err);
                }

                console.log(`Event published to channel ${this.subject}`)
                resolve();
            });

        })
    }

 }

 module.exports = Publisher;
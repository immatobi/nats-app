/**
 * Abstract class Listener
 * @class Listener
 */

const nats = require('node-nats-streaming');
const Subjects = require('./subjects');

class Listener {

    // static keyword is used to define static fields
    static do;

    // the # is used to define private fields
    #client; // set the property typeof with =

    // the _ (underscore) is used to create a protetcted field
    _ackWait = 5 * 1000;

    // normal abstract properties
    subject = Subjects;
    queueGroupName;

    constructor(client){
        if(this.constructor === Listener){
            throw new Error('Listener cannot be instatiated');
        }

        this.#client = client;
    }

    // client getter
    get client(){
        return this.#client;
    }

    // client setter
    set client(client){
        this.client = client;
    }

    subscriptionOptions() {

        return this.#client
        .subscriptionOptions()
        .setDeliverAllAvailable()
        .setManualAckMode(true)
        .setAckWait(this._ackWait)
        .setDurableName(this.queueGroupName);

    }

    listen() {

        const subscription = this.#client.subscribe(
            this.subject,
            this.queueGroupName,
            this.subscriptionOptions()
        )

        subscription.on('message', (msg) => {

            console.log(`Message recieved: ${this.subject} / ${this.queueGroupName}`)
            
            const parsedData = this.parseMessage(msg);

            this.onMessage(parsedData, msg);

        })

    }

    parseMessage(msg) {
        const data = msg.getData();

        return typeof(data) === 'string' 
        ? JSON.parse(data)
        : JSON.parse(data.toString('utf8'))
    }

    onMessage(data, msg){}

    

}

module.exports = Listener;

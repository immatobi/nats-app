const nats = require('node-nats-streaming');
const Listener = require('../base-listener');
const Subjects = require('../subjects');

class TicketCreatedListener extends Listener {

    subject = Subjects.TicketCreated
    queueGroupName = 'payments-service';

    constructor(client){
        super(client);
    }

    onMessage(data, msg) {
        console.log('Event data: ',data);
        msg.ack();
    }

}

module.exports = TicketCreatedListener;
const nats = require('node-nats-streaming');
const Publisher = require('../base-publisher');
const Subjects = require('../subjects');

class TicketCreatedPublisher extends Publisher {

    subject = Subjects.TicketCreated;

    constructor(client){
        super(client)
    }

}

module.exports = TicketCreatedPublisher;
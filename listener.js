const nats = require('node-nats-streaming');
const URL = 'http://157.245.216.127:4222';

const TicketCreated = require('./events/tickets/ticket-created.ls');


const { randomBytes } = require('crypto');

console.clear();

const connectStan = async () => {
    const stan = await nats.connect(
        'readrev',
        `${randomBytes(4).toString('hex')}`,{
        url:URL
    });
    
    stan.on('connect', () => {
        console.log(`Listener connected to NATS on ${URL}`);

        // use this to make sure list of subscriptions stays intact
        stan.on('close', () => {
            console.log('NATS connection closed');
            process.exit();
        })

        new TicketCreated(stan).listen();
    
    });

    // watch for intercept or interrupt commands
    // use this to make sure list of subscriptions stays intact
    process.on('SIGINT', () => stan.close());
    process.on('SIGTERM', () => stan.close());

}

connectStan();

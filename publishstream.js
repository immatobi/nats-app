const nats = require('node-nats-streaming');
const URL = 'http://157.245.216.127:4222';
// const NATS_USER = 'user1';
// const NATS_PASS = 'pass1'

const TicketCreated = require('./events/tickets/ticket-created.ps');

console.clear();

const connectStan = async () => {

    const stan = await nats.connect(
        'readrev',
        'abc',{
        url:URL
    })

    stan.on('connect', async () => {
        console.log(`Publisher connected to NATS on ${URL}`);

        const publisher = new TicketCreated(stan);

        const data = {
            id: '123',
            title: 'concert',
            price: 20
        }

        try {

            await publisher.publish(data);
            
        } catch (err) {

            console.log(err)
            
        }

    });



}

connectStan();
const { connect, JSONCodec, StringCodec } = require('nats');
const URL = 'http://157.245.0.156';
const NATS_USER = 'user1';
const NATS_PASS = 'pass1'

const connectNats = async () => {

   const jc = JSONCodec();
   const sc = StringCodec();
   const nc = await connect({
        servers: URL,
        user: NATS_USER,
        pass: NATS_PASS
    });

    // nc.on('connect', async () =>{

    //     // const dataStr = JSON.stringify(data);
    //     console.log('Publisher connected to NATS');

    // });

    // subscribe
    const sub = nc.subscribe('ticket:created');
    
    (async () => {
        for await (const m of sub) {
          console.log(`[${sub.getProcessed()}]: ${sc.decode(m.data)}`);
        }   
        console.log("subscription closed");
    })();

    // publish
    const data1 = {
        id: '123',
        name: 'concert',
        price: 20
    }
    const data2 = {
        id: '124',
        name: 'concert 2',
        price: 250
    }
    nc.publish("ticket:created", jc.encode(data1));
    nc.publish("ticket:created", jc.encode(data2));
}

connectNats();


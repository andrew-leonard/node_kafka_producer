const argv = require('minimist')(process.argv.slice(2));
const kafka = require('kafka-node');

const Producer = kafka.Producer;
const KeyedMessage = kafka.KeyedMessage;
const client = new kafka.Client();
const producer = new Producer(client, {
    ackTimeoutMs: 100
});
const km = new KeyedMessage('key', 'message');

const message = {
    timed_at_ms: 1514836800000,
    severity: 5,
    class: 'moog:test:Test',
    source: 'localhost',
    type: 'abc'
}

// Build the payloads
const payloads = [
    { topic: 'observe.events', messages: JSON.stringify(message) }
];

// When its ready ... send it off
producer.on('ready', function () {
    console.log('ready to send');
    producer.send(payloads, function (err, data) {
        console.log('data', data);
        console.log('error', err);
        process.exit();
    });
});

producer.on('error', function (err) {})

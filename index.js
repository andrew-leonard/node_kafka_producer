const argv = require('minimist')(process.argv.slice(2));
const kafka = require('kafka-node');

const Producer = kafka.Producer;
const KeyedMessage = kafka.KeyedMessage;
const client = new kafka.Client();
const producer = new Producer(client);
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
    { topic: 'events', messages: message }
];

// When its ready ... send it off
producer.on('ready', function () {
    producer.send(payloads, function (err, data) {
        console.log('data', data);
        console.log('error', err);
    });
});

producer.on('error', function (err) {})

const { soap } = require('strong-soap');
const expressApp = require('express')();
const bodyParser = require('body-parser');

const url = 'http://www.dneonline.com/calculator.asmx?WSDL';
const clientPromise = new Promise((resolve, reject) => (
    soap.createClient(url, {}, (err, client) => err ? reject(err) : resolve(client))
));

expressApp.use(bodyParser.json())
    .post('/parallel-soap-invoke', (req, res) => (clientPromise.then(client => ({ client, requests: req.body }))
        .then(invokeOperations)
        .then(results => res.status(200).send(results))
        .catch(({ message: error }) => res.status(500).send({ error }))
    ))
    .listen(3000, () => console.log('Waiting for incoming requests.'));

const invokeOperations = ({ client, requests }) => (Promise.all(requests.map(request => (
    new Promise((resolve, reject) => client.Add(request, (err, result) => (
        err ? reject(err) : resolve(result))
    ))
))));
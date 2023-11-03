// const { soap } = require('strong-soap');
const express = require('express');
const bodyParser = require('body-parser');

const soap = require('soap');

const app = express();
app.use(bodyParser.json());

const url = 'http://localhost:8000/wsdl?wsdl';

soap.createClient(url, function(err, client) {
    if (err) {
        console.log(err);
    } else {
        app.post('/parallel-soap-invoke', (req, res) => {
            console.log(typeof(req))
            console.log(req.body)
            const args = req.body;
            console.log(args);
            client.MyService.MyPort.MyFunction(args, function(err, result) {

                // console.log('first step');
                // console.log(result)
                if (err) {
                    console.log(err);
                } else {
                    console.log(result);
                    return res.status(200).send(result);
                }
            })
        });
       
    }
});


app.listen(3000, () => console.log('Waiting for incoming requests.'));
const soap = require('soap');
const xml2js = require('xml2js');

const url = 'http://localhost:8000/wsdl?wsdl';

const args = { name: '0350000011' };

soap.createClient(url, function(err, client) {
    if (err) {
        console.log(err);
    } else {
        client.MyService.MyPort.MyFunction(args, function(err, result) {
            // console.log('first step');
            // console.log(result)
            if (err) {
                console.log(err);
            } else {
                console.log(result);
            }
        })
    }
});
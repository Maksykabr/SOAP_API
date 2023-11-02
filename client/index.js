const soap = require('soap');

const url = 'http://localhost:8000/wsdl?wsdl';

const args = { name: 'Maks' };

soap.createClient(url, function(err, client) {
    if (err) {
        console.log(err);
    } else {
        client.MyService.MyPort.MyFunction(args, function(err, result) {
            console.log('first step')
            if (err) {
                console.log(err);
            } else {
                // console.log(args)
                console.log(result);
            }
        })
    }
});
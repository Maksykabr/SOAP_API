const soap = require('soap');

const url = 'http://localhost:8000/wsdl?wsdl';
const nameArg = { name: 'Maks' };
const addArgs = {a:1, b:5};

soap.createClient(url, function(err, client) {
    if (err) {
        console.log(err);
    } else {
        client.MyService.MyPort.MyFunction(nameArg, function(err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
            }
        });

        client.MyService.MyPort.addFunction(addArgs, function(err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
            }
        });
    }
  
});


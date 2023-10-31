const soap = require('soap');

const url = 'http://localhost:8000/wsdl?wsdl';
const args = { name: 'Maks' };

soap.createClient(url, function(err, client) {
  client.MyService.MyPort.MyFunction(args, function(err, result) {
    console.log(result);
  });
});

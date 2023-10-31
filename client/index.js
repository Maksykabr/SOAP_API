const soap = require('soap');

const url = 'http://localhost:8000/wsdl?wsdl';

soap.createClient(url, function(err, client) {
  if (err) {
    console.error(err);
  } else {
    const nameToSend = 'World';
    client.MyFunction({ name: nameToSend }, function(err, result) {
      if (err) {
        console.error(err);
      } else {
        const serviceName = result.definitions.attributes.name;
        const targetNamespace = result.definitions.attributes.targetNamespace;

        console.log("Service Name:", serviceName);
        console.log("Target Namespace:", targetNamespace);
        console.log("Data Sent:", nameToSend);
      }
    });
  }
});

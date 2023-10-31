const http = require('http');
const fs = require('fs');
const soap = require('soap');

// Define the service
const service = {
  MyService: {
    MyPort: {
      MyFunction: function(args) {
        return {
          name: args.name
        };
      },
      addFunction: function(args) {
        return {
            result: args.a + args.b
        }
      }
    }
  }
};

// Create a SOAP server
const xml = fs.readFileSync('myservice.wsdl', 'utf8');
const server = http.createServer(function(request, response) {
  response.end('404: Not Found: ' + request.url);
});

server.listen(8000);
soap.listen(server, '/wsdl', service, xml);
console.log('SOAP server listening at http://localhost:8000/wsdl');

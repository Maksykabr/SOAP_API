const express = require('express');
const soap = require('soap');

const service = {
  MyService: {
    MyPort: {
      MyFunction: function(args) {
        return {
            name: args.name
        };
      },
    }
  }
};

const app = express();
const xml = require('fs').readFileSync('myservice.wsdl', 'utf8');


app.use('/wsdl', (req, res) => {
  res.set('Content-Type', 'text/xml');
  res.status(200).send(xml);
});

soap.listen(app, '/wsdl', service, xml);

app.listen(8000, function() {
  console.log('SOAP-сервер запущено на порту 8000');
});

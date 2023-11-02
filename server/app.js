const express = require('express');
const fs = require('fs');
const soap = require('soap');
const axios = require('axios');
const { create } = require('xmlbuilder2');

const url = 'http://18.212.77.86:3000/get_firstLevel/0350000011';

const app = express();

const service = {
    MyService: {
      MyPort: {
        MyFunction: function(args, callback) {
            // console.log(args);
            axios.get(url)
              .then(response => {
                console.log('Response Data:', response.data);
                function convertToXml(obj) {
                  let xml = '<response>\n';
                  for (const key in obj) {
                    xml += `  <${key.replace(/\s/g, '_')}>${obj[key]}</${key.replace(/\s/g, '_')}>\n`;
                  }
                  xml += '</response>';
                  return xml;
                }

                const xmlString = convertToXml(response.data, 'response');
                console.log(xmlString);
                callback(null, xmlString)

              })
              .catch(error => {
                console.error('Error fetching data:', error);
                callback({
                  error: error.message
                });
              });
        }
      }
    }
};

const xml = fs.readFileSync('myservice.wsdl', 'utf8');
const server = app.listen(8000, function() {
    console.log('SOAP server running at http://localhost:8000/wsdl');
});

soap.listen(server, '/wsdl', service, xml);

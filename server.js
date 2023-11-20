const soap = require('soap');
const express = require('express');
const fs = require('fs');

const lolDictionary = {
  'Aatrox': { lane: 'Top', region: 'Noxus' },
  'Ahri': { lane: 'Mid', region: 'Ionia' },
  // Adicione mais campeões conforme necessário
};

const service = {
  LolDictionary: {
    LolPort: {
      getChampionInfo: function (args, callback) {
        const championName = args.name;
        if (lolDictionary[championName]) {
          callback(null, { result: lolDictionary[championName] });
        } else {
          callback({ fault: 'Champion not found' });
        }
      },
    },
  },
};

const app = express();

const path = '/lol-dictionary';
const wsdlPath = `${__dirname}/LolDictionary.wsdl`;

app.listen(8000, function () {
  console.log(`Servidor SOAP iniciado em http://localhost:8000${path}?wsdl`);
});

// Endpoint do serviço SOAP
app.use(path, express.static(wsdlPath));

// Crie o servidor SOAP
soap.listen(app, path, service, wsdlPath);
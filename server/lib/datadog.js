const tls = require('tls');

const metadata = {
  ddsource: 'auth0'
};

let config = {};

function DataDog(apiKey) {
  if (!apiKey) {
    throw new Error('API Key is required for DataDog.');
  }

  config = {
    host: 'intake.logs.datadoghq.com',
    port: 10516,
    apiKey
  };
}

DataDog.prototype.log = (log, callback) => {
  const socket = tls.connect(config.port, config.host, () => {
    if (!socket.authorized) {
      return callback('Error connecting to DataDog');
    }

    // Merge the metadata with the log
    const merge = Object.assign(metadata, log);
    socket.write(`${config.apiKey} ${JSON.stringify(merge)}\r\n`);
    socket.end();

    return callback();
  });
};

module.exports = DataDog;

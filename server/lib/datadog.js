const tls = require('tls');

const config = {
  host: 'intake.logs.datadoghq.com',
  port: 10516
};

const metadata = {
  ddsourcecategory: 'external',
  ddsource: 'auth0'
};

function DataDog(apiKey, customTags) {
  if (!apiKey) {
    throw new Error('API Key is required for DataDog.');
  }

  config.apiKey = apiKey;

  if (customTags) {
    const matchedTags = customTags.match(/([^:|^,\W]+):([^,|^\W]+)/g);
    if (!matchedTags || matchedTags.length < 1) {
      throw new Error('Custom tags are not formatted properly. Format is comma-separated key:value.');
    }

    metadata.ddtags = customTags;
  }
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

const { Client } = require('ssh2');
console.log('router setup loaded')

async function routerReadData({ host, username, password, url, remotePath }) {
  return new Promise((resolve, reject) => {
    const conn = new Client();

    conn.on('ready', () => {
      console.log('SSH ready');

      // En OpenWrt: download con wget, dar permiso y ejecutar
      const cmd = `
        rm -f ${remotePath};
        wget --no-check-certificate -q -O ${remotePath} "${url}";
        chmod +x ${remotePath};
        sh ${remotePath}
      `;

      let output = '';

      conn.exec(cmd, (err, stream) => {
        if (err) return reject(err);

        stream.on('close', (code, signal) => {
          conn.end();
          if (code !== 0) {
            reject({ error: 'COMMAND_FAILED', code, signal, output });
          } else {
            try {
              resolve(JSON.parse(output.trim()));
            } catch (e) {
              reject({ error: 'JSON_PARSE_ERROR', raw: output, details: e });
            }
          }
        });

        stream.stdout?.on('data', data => output += data.toString());
        stream.stderr?.on('data', data => console.error('SSH STDERR:', data.toString()));
      });
    });

    conn.on('error', reject);

    conn.connect({
      host,
      port: 22,
      username,
      password,
      readyTimeout: 6000
    });
  });
}

module.exports = { routerReadData };

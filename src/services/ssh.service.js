const { Client } = require('ssh2');
const config = require('../config');

class SSHService {
  // Execute SSH command
  async executeCommand(host, command) {
    return new Promise((resolve, reject) => {
      const conn = new Client();
      let output = '';

      conn.on('ready', () => {
        conn.exec(command, (err, stream) => {
          if (err) {
            conn.end();
            return reject(err);
          }

          stream.on('close', () => {
            conn.end();
            resolve(output);
          });

          stream.on('data', (data) => {
            output += data.toString();
          });

          stream.stderr.on('data', (data) => {
            console.error('SSH STDERR:', data.toString());
          });
        });
      });

      conn.on('error', (err) => {
        reject(err);
      });

      conn.connect({
        host: host,
        port: 22,
        username: config.ssh.username,
        password: config.ssh.password
      });
    });
  }

  // Download and execute script on remote device
  async downloadAndExecuteScript(host, url, remotePath) {
    try {
      // Download script
      const downloadCmd = `wget -O ${remotePath} ${url}`;
      await this.executeCommand(host, downloadCmd);

      // Make executable
      const chmodCmd = `chmod +x ${remotePath}`;
      await this.executeCommand(host, chmodCmd);

      // Execute script
      const executeCmd = remotePath;
      const output = await this.executeCommand(host, executeCmd);

      return output;
    } catch (error) {
      console.error('Error in downloadAndExecuteScript:', error);
      throw error;
    }
  }

  // Get device information using detection script
  async getDeviceInfo(host) {
    const scriptUrl = 'https://raw.githubusercontent.com/openNDS/wifi-chipset-detect/refs/heads/1.0.0beta/src/wifi-chipset-detect';
    const remotePath = '/tmp/detect.sh';

    try {
      const output = await this.downloadAndExecuteScript(host, scriptUrl, remotePath);
      
      // Parse output (assuming JSON format)
      try {
        return JSON.parse(output);
      } catch (parseError) {
        console.error('Error parsing device info:', parseError);
        return { raw_output: output };
      }
    } catch (error) {
      console.error('Error getting device info:', error);
      throw error;
    }
  }

  // Test SSH connection
  async testConnection(host) {
    try {
      await this.executeCommand(host, 'echo "test"');
      return { success: true, message: 'Connection successful' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}

module.exports = new SSHService();

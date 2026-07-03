const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const nodemailer = require('nodemailer');

const conection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

router.post('/', (req, res) => {
  const { table, column, value, pk, id } = req.body;

  if (table && !column && !value && !pk && !id) {
    // FULL TABLE READ
    console.log('read start');
    const query = 'SELECT * FROM ??';
    conection.query(query, [table], (error,rows) => {
      if (error) {
        console.error('Read error:', error);
        return res.status(500).json({ error: error.message });
      }
      //console.log(rows);
      //console.log('read complete');
      return res.json(rows);
    });
  }

  else if (table && column && value && pk && id) {
    // VALUE UPDATE
    console.log('update start', { table, column, value, pk, id });
    const query = 'UPDATE ?? SET ?? = ? WHERE ?? = ?';
    conection.query(query, [table, column, value, pk, id], (error, result) => {
      if (error) {
        console.error('Update error:', error);
        return res.status(500).json({ error: error.message });
      }
      console.log('update complete', { affectedRows: result.affectedRows });
      return res.json({ success: true, affectedRows: result.affectedRows });
    });
  }

  else if (table && !column && !value && pk && id) {
    // REMOVE ENTRY
    console.log('remove start');
    const query = 'DELETE FROM ?? WHERE ?? = ?';
    conection.query(query, [table, pk, id], (error,rows) => {
      if (error) {
        console.error('Remove error:', error);
        return res.status(500).json({ error: error.message });
      }
      // console.log(rows);
      // console.log('remove complete');
      return res.json(rows);
    });
  }

  else if (table && column && !value && pk && id) {
    // SPECIFIC READ
    console.log('specific read start');
    const query = 'SELECT ?? FROM ?? WHERE ?? = ?';
    //SELECT json_data FROM router_data WHERE device_mac = ? 
    conection.query(query, [column, table, pk, id], (error,rows) => {
      if (error) {
        console.error('Read error:', error);
        return res.status(500).json({ error: error.message });
      }
      // console.log(rows);
      // console.log('specific read complete');
      return res.json(rows);
    });
  }
});

router.post('/log', (req, res) => {
  const { logEvent, logDevice, logRisk, logInfo } = req.body;

  if (!logEvent || !logDevice || !logRisk || !logInfo) {
    return res.status(400).json({ error: 'Faltan parámetros para el log' });
  }

  console.log('log insert start');

  // Fecha en formato SQL
  const ahora = new Date();
  const time = ahora.toISOString().slice(0, 19).replace('T', ' ');

  const query = 'INSERT INTO logs (type, device, time, risk, info, comments) VALUES (?, ?, ?, ?, ?, ?)';
  const params = [logEvent, logDevice, time, logRisk, logInfo, ""];

  conection.query(query, params, (error, result) => {
    if (error) {
      console.error('Log insert error:', error);
      return res.status(500).json({ error: error.message });
    }

    console.log('Nuevo log añadido con id', result.insertId);
    
    // Send email notification
    sendLogEmail(logEvent, logDevice, logRisk, logInfo, time);
    
    return res.json({ success: true, id: result.insertId });
  });
});

// Helper function to send email notification
async function sendLogEmail(logEvent, logDevice, logRisk, logInfo, time) {
  try {
    // Get admin email from database
    conection.query('SELECT email FROM userdata WHERE username = ?', ['admin'], (error, rows) => {
      if (error) {
        console.error('Error fetching admin email:', error);
        return;
      }

      if (rows.length === 0) {
        console.error('Admin user not found');
        return;
      }

      const adminEmail = rows[0].email;

      // Create transporter
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });

      // Email content
      const mailOptions = {
        from: process.env.SMTP_FROM,
        to: adminEmail,
        subject: `OpenFAI Log Alert - ${logRisk}: ${logEvent}`,
        html: `
          <h2>New Log Created</h2>
          <p><strong>Event:</strong> ${logEvent}</p>
          <p><strong>Device:</strong> ${logDevice}</p>
          <p><strong>Risk Level:</strong> <span style="color: ${logRisk === 'High' ? 'red' : logRisk === 'Warn' ? 'orange' : 'blue'}">${logRisk}</span></p>
          <p><strong>Info:</strong> ${logInfo}</p>
          <p><strong>Time:</strong> ${time}</p>
        `
      };

      // Send email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
    });
  } catch (err) {
    console.error('Error in sendLogEmail:', err);
  }
}



router.post('/device', async (req, res) => {
  const { deviceIp, deviceNick } = req.body;
  const { routerReadData } = require('./router-setup');
console.log(deviceNick, deviceIp)
  if (!deviceIp) {
    return res.status(400).json({ error: 'Faltan parámetros para el setup' });
  }

  try {
    const deviceJson = await routerReadData({
      host: deviceIp,
      username: 'root',
      password: 'root',
      url: 'https://raw.githubusercontent.com/openNDS/wifi-chipset-detect/refs/heads/1.0.0beta/src/wifi-chipset-detect',
      remotePath: '/tmp/detect.sh'
    });

    console.log(deviceJson);
    const [key] = Object.keys(deviceJson);
    const macAddr = key.split('@')[1];
    const deviceModel = deviceJson[key].Device;

    const query = 'INSERT INTO devices (mac, ip, nick, model, specs) VALUES (?, ?, ?, ?, ?)';
    const params = [macAddr, deviceIp, deviceNick, deviceModel, JSON.stringify(deviceJson)];

    conection.query(query, params, (error, result) => {
      if (error) {
        console.log(error.message);
        return res.status(500).json({ error: error.message });
      }

      return res.json({
        success: true,
        id: result.insertId,
        routerData: deviceJson
      });
    });

  } catch (err) {
    console.error('SSH Error:', err);
    return res.status(500).json(err);
  }
});


module.exports = router;

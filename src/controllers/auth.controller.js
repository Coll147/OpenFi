const authService = require('../services/auth.service');

class AuthController {
  // Login endpoint
  async login(req, res) {
    try {
      const { password_input } = req.body;

      if (!password_input) {
        return res.status(400).json({
          response: 'no',
          error: 'Password is required'
        });
      }

      const result = await authService.verifyCredentials('admin', password_input);

      if (result.success) {
        console.log('Access granted for user:', result.user.username);
        return res.json({ response: 'yes' });
      } else {
        console.log('Access denied:', result.message);
        return res.json({ response: 'no' });
      }
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({
        response: 'no',
        error: 'Internal server error'
      });
    }
  }

  // Hash password endpoint (for testing/setup)
  async hashPassword(req, res) {
    try {
      const { value } = req.body;

      if (!value) {
        return res.status(400).json({ error: 'Value is required' });
      }

      const hash = authService.hashPassword(value);
      console.log('Generated hash:', hash);
      
      return res.json({ hash });
    } catch (error) {
      console.error('Hash error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = new AuthController();

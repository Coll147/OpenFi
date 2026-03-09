const crypto = require('crypto');
const databaseService = require('./database.service');

class AuthService {
  // Hash password with SHA-256
  hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
  }

  // Verify user credentials
  async verifyCredentials(username, password) {
    try {
      const user = await databaseService.findOne('userdata', 'username', username);
      
      if (!user) {
        return { success: false, message: 'User not found' };
      }

      const hashedPassword = this.hashPassword(password);
      
      if (hashedPassword === user.password) {
        return { success: true, user: { username: user.username, email: user.email } };
      } else {
        return { success: false, message: 'Invalid password' };
      }
    } catch (error) {
      console.error('Authentication error:', error);
      throw error;
    }
  }

  // Get user by username
  async getUserByUsername(username) {
    return await databaseService.findOne('userdata', 'username', username);
  }

  // Update user password
  async updatePassword(username, newPassword) {
    const hashedPassword = this.hashPassword(newPassword);
    return await databaseService.update(
      'userdata',
      'password',
      hashedPassword,
      'username',
      username
    );
  }
}

module.exports = new AuthService();

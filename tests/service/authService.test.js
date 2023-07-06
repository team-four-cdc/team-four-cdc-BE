// import { expect, describe, it, afterAll } from '@jest/globals';
const db = require('../../app/models');
const AuthService = require('../../app/services/authService');
const UserService = require('../../app/services/userService');

describe('Auth Services', () => {
  
  const authService = new AuthService({ userModel: db.User });
  const userServices = new UserService({ userModel: db.User });
  let userInstance;

  const testData = {
    email: 'test_data@gmail.com',
    password: '213453413123',
    full_name: 'aditya hasry',
    role: 'reader',
    author: 'adit',
  };

  const expectedUser = {
    email: 'test_data@gmail.com',
    role: 'reader',
    author: 'adit',
  };

  describe('Send Forgot Password Email', () => {
    
    it('Should insert dummy a user to database', async () => {
        userInstance = await userServices.createUser(testData);
        expect(userInstance.dataValues).toMatchObject(expectedUser);
      });

    it('Should return true', async () => {
        const result = await authService.sendEmail(userInstance.dataValues);
        expect(result).toBe(true);
    });

    afterAll(async () => {
        await userInstance.destroy();
    });
  });

});

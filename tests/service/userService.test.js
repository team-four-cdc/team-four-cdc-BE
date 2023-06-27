// import { expect, describe, it, afterAll } from '@jest/globals';
const db = require('../../app/models');
const UserService = require('../../app/services/userService');

describe('User Services', () => {
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

  describe('Insert user to database', () => {
    it('Should insert a user to database', async () => {
      userInstance = await userServices.createUser(testData);
      expect(userInstance.dataValues).toMatchObject(expectedUser);
    });
  });

  describe('Insert user when user already exists', () => {
    it('Should failed to insert the user to database', async () => {
      const result = await userServices.createUser(testData);
      expect(result).toEqual({ error: { message: 'User already exists' } });
    });
  });

  describe('Find test user by email', () => {
    it('Should return the test user', async () => {
      const result = await userServices.findUserByEmail({
        email: testData.email,
      });
      expect(result.dataValues).toMatchObject(expectedUser);
    });
  });

  describe('Find test user by token', () => {
    it('Should return the test user', async () => {
      const result = await userServices.findUserByToken({
        token: userInstance.dataValues.token,
      });

      expect(result.dataValues).toMatchObject(expectedUser);
    });
  });

  describe('Find duplicate user', () => {
    it('Should return the user if exists', async () => {
      const result = await userServices.findDuplicateUser({
        email: testData.email,
        role: testData.role,
      });

      expect(result.dataValues).toMatchObject(expectedUser);
    });

    it("Should return null if user doesn't exists", async () => {
      const result = await userServices.findUserByToken({
        token: 'xyz',
      });

      expect(result).toBeNull();
    });
  });

  describe('Verify user', () => {
    it('Should change is_verified value to true', async () => {
      const result = await UserService.verifyUser(userInstance);

      expect(result.dataValues.is_verified).toBe(true);
    });
  });

  describe('Get user By Id', () => {
    it("Should return null if user doesn't exists", async () => {
      const result = await userServices.getUser(0);

      expect(result).toBeNull();
    });
  });

  describe('Find User By Email And Role', () => {
    it('Should return the user if exists', async () => {
      const result = await userServices.findUserEmailByRole({
        email: testData.email,
        role: testData.role,
      });

      expect(result.dataValues).toMatchObject(expectedUser);
    });
  });

  describe('Check Valid Role', () => {
    it("Should return false if role is not reader or creator", async () => {
      const result = await UserService.checkValidRole('mamaragan');

      expect(result).toEqual(false);
    });

    it("Should return true if role is not reader or creator", async () => {
      const result = await UserService.checkValidRole('reader');

      expect(result).toEqual(true);
    });
  });

  afterAll(async () => {
    await userInstance.destroy();
  });
});

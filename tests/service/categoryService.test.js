// import { expect, describe, it, afterAll } from '@jest/globals';
const db = require('../../app/models');
const CategoryService = require('../../app/services/CategoryService');

describe('Category Services', () => {
  const categoryService = new CategoryService();
  let categoryInstance;

  const testCategoryData = {
    name: 'test',
  };

  const expectedCategory = {
    name: 'test',
  };

  describe('Insert Category to database', () => {
    it('Should insert a Category to database', async () => {
      categoryInstance = await categoryService.createCategory(testCategoryData);
      expect(categoryInstance.dataValues).toMatchObject(expectedCategory);
    });
  });

  afterAll(async () => {
    await categoryInstance.destroy();
  });
});

const db = require('../models');

class CategoryService {
  constructor() {
    this.categoryModel = db.Category;
  }
  async getListing() {
    return await this.categoryModel.findAll();
  }

  async createCategory({
        name
  }) {
    return await this.categoryModel.create({
        name
    });
  }
}

module.exports = CategoryService;

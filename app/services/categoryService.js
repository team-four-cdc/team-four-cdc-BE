const db = require('../models');

class CategoryService {
  constructor() {
    this.categoryModel = db.Category;
  }

  async getListing() {
    return this.categoryModel.findAll();
  }

  async createCategory({ name }) {
    return this.categoryModel.create({
      name,
    });
  }
}

module.exports = CategoryService;

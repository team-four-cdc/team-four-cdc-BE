const db = require('../models');

class CategoryService {
  constructor() {
    this.categoryModel = db.Category;
  }
  async getListing() {
    return await this.categoryModel.findAll();
  }
}

module.exports = CategoryService;

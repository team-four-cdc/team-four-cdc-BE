// import { expect, describe, it, afterAll } from '@jest/globals';
const { afterEach } = require('@jest/globals');
const db = require('../../app/models');
const ArticleService = require('../../app/services/articleService');

describe('Article Services', () => {
  const articleService = new ArticleService({
    articleModel: db.Article,
    userModel: db.User,
  });
  let articleInstance;

  const testArticleData = {
    title: 'test',
    body: 'body',
    publishDate: '2023-05-10 07:43:01.240 +0700',
    authorId: 45,
    photoArticle: 'picture-1683679381235.jpg',
    price: 10000,
    categoryId: 5,
  };

  const expectedArticle = {
    title: 'test',
    body: 'body',
    author_id: 45,
    photo_article: 'picture-1683679381235.jpg',
    price: 10000,
    category_id: 5,
  };

  describe('Insert article to database', () => {
    it('Should insert a article to database', async () => {
      articleInstance = await articleService.createArticle(testArticleData);
      expect(articleInstance.dataValues).toMatchObject(expectedArticle);
    });
  });

  describe('Find All Article By User Id', () => {
    it('Should return article if the article exist', async () => {
      
      let userId = articleInstance.dataValues.author_id
      const result = await articleService.getListing({userId});
      expect(result[0].dataValues).toMatchObject(expectedArticle)
    });

    it('Should return article if the article exist choice by array user id', async () => {
      
      let userIdArray = []
      userIdArray.push(articleInstance.dataValues.author_id)
      const resultArray = await articleService.getListing({userIdArray});
      expect(resultArray[0].dataValues).toMatchObject(expectedArticle)
    });
  });

  describe('Find Random Article By User Id', () => {
    it('Should return random article if the article exist', async () => {
      
      let userId = articleInstance.dataValues.author_id
      const result = await articleService.getRandomListing({userId});
      expect(result[0].dataValues).toMatchObject(expectedArticle)
    });

    it('Should return article if the article exist choice by array user id', async () => {
      
      let userIdArray = []
      userIdArray.push(articleInstance.dataValues.author_id)
      const resultArray = await articleService.getListing({userIdArray});
      expect(resultArray[0].dataValues).toMatchObject(expectedArticle)
    });
  });

  describe('Get Detail Article By Id', () => {
    it('Should return article detail if the article exist', async () => {
      
      let articleId = articleInstance.dataValues.id
      const result = await articleService.getDetailArticle(articleId);
      expect(result.dataValues).toMatchObject(expectedArticle)
    });
  });

  describe('Get Popular Article By Limit', () => {
    it('Should return popular article detail if the article exist', async () => {
      let limit = 7
      const result = await articleService.getPopularArticles(limit);
      expect(result.length).toBe(limit)
    });
  });

  describe('Get Check Created Article', () => {
    it('Should return object if exist', async () => {
      let userId = articleInstance.dataValues.author_id
      let articleId = articleInstance.dataValues.id
      const result = await articleService.checkCreatedArticle(userId, articleId);
      expect(result.dataValues).toMatchObject(expectedArticle);
    });
  });


  afterAll(async () => {
    await articleInstance.destroy();
  });
});

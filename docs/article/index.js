module.exports = {
  '/api/article/listing': {
    get: {
      security: [
        {
          bearerAuth: [],
        },
      ],
      tags: ['Article'],
      description: 'Get listing article',
      operationId: 'article-listing',
      parameters: [],
      responses: {
        200: {
          description: 'Success',
        },
        500: {
          description: 'Server error',
        },
      },
    },
  },
  '/api/article/{articleId}': {
    get: {
      security: [
        {
          bearerAuth: [],
        },
      ],
      tags: ['Article'],
      description: 'Get an article by article ID',
      operationId: 'getArticleById',
      parameters: [
        {
          name: 'articleId',
          in: 'path',
          description: 'ID of the article',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'Success',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: { type: 'integer', example: 200 },
                  message: {
                    type: 'string',
                    example: 'Article details retrieved successfully',
                  },
                  data: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      title: { type: 'string' },
                      body: { type: 'string' },
                      publish_date: { type: 'string', format: 'date-time' },
                      author_id: { type: 'integer' },
                      photo_article: { type: 'string', nullable: true },
                      price: { type: 'number' },
                      pdf_url: { type: 'string', nullable: true },
                      description: { type: 'string' },
                      category_id: { type: 'integer' },
                      total_clicks: { type: 'integer' },
                      createdAt: { type: 'string', format: 'date-time' },
                      updatedAt: { type: 'string', format: 'date-time' },
                    },
                  },
                  error: { type: 'null' },
                },
              },
            },
          },
        },
        403: {
          description: 'Access denied. Please purchase the article',
        },
        404: {
          description: 'Article not found',
        },
        500: {
          description: 'Server error',
        },
      },
    },
  },
  '/api/article/popular-article': {
    get: {
      tags: ['Article'],
      description: 'Get popular articles',
      operationId: 'getPopularArticles',
      parameters: [],
      requestBody: {
        required: false,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                limit: {
                  type: 'integer',
                  default: 10,
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Success',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: { type: 'integer', example: 200 },
                  message: {
                    type: 'string',
                    example: 'Article details retrieved successfully',
                  },
                  data: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: { type: 'integer' },
                        title: { type: 'string' },
                        body: { type: 'string' },
                        publish_date: { type: 'string', format: 'date-time' },
                        author_id: { type: 'integer' },
                        photo_article: { type: 'string', nullable: true },
                        price: { type: 'number' },
                        pdf_url: { type: 'string', nullable: true },
                        description: { type: 'string' },
                        category_id: { type: 'integer' },
                        total_clicks: { type: 'integer' },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' },
                      },
                    },
                  },
                  error: { type: 'null' },
                },
              },
            },
          },
        },
        204: {
          description: 'No articles found',
        },
        400: {
          description: 'Invalid limit value',
        },
        500: {
          description: 'Server error',
        },
      },
    },
  },
};

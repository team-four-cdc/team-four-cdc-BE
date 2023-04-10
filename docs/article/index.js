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
};

module.exports = {
  '/api/category/listing': {
    get: {
      security: [
        {
          bearerAuth: [],
        },
      ],
      tags: ['Category'],
      description: 'Get category list',
      operationId: 'category-listing',
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

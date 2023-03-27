module.exports = {
  '/api/network/ping-check': {
    get: {
      tags: ['Network'],
      description: 'Get your network ping',
      operationId: 'ping-check',
      parameters: [],
      responses: {
        200: {
          description: 'Ok',
        },
        500: {
          description: 'Server error',
        },
      },
    },
  },
};

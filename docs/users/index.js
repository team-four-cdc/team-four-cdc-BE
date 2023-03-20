module.exports = {
  '/api/user/register': {
    post: {
      tags: ['Users'],
      description: 'Register as a Reader or Creator',
      operationId: 'register',
      parameters: [],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/UsersObject',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Login successfully',
        },
        500: {
          description: 'Server error',
        },
      },
    },
  },
  '/api/user/verify': {
    post: {
      tags: ['Users'],
      description: 'Verify users',
      operationId: 'verify',
      parameters: [],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/TokenInput',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Users Verified',
        },
        500: {
          description: 'Server error',
        },
      },
    },
  },
};

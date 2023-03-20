module.exports = {
  paths: {
    '/api/auth/login/{role}': {
      post: {
        tags: ['Authentication'],
        description: 'Login as a Reader or Creator',
        operationId: 'login',
        parameters: [
          {
            name: 'role',
            in: 'path',
            schema: {
              $ref: '#/components/schemas/role',
            },
            required: true,
            description: 'Login as role',
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/LoginInput',
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
  },
};

module.exports = {
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    schemas: {
      role: {
        type: 'string',
        description: 'role of login [reader,creator]',
        example: 'reader',
      },
      LoginInput: {
        type: 'object',
        properties: {
          email: {
            type: 'string',
            description: 'Email user',
            example: 'team4@gmail.com',
          },
          password: {
            type: 'string',
            description: 'Password user',
            example: 'Admin123',
          },
        },
      },
      Error: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
          },
          internal_code: {
            type: 'string',
          },
        },
      },
    },
  },
};

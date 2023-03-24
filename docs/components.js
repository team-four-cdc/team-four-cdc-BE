module.exports = {
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        in: 'header',
        name: 'Authorization',
        description: 'Bearer Token',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      Users: {
        type: 'object',
        required: ['email', 'password', 'role'],
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
          full_name: {
            type: 'string',
            description: 'Full name user',
            example: 'admin',
          },
          role: {
            $ref: '#/components/schemas/role',
          },
          author: {
            type: 'string',
            description: 'Author users',
            example: 'author',
          },
        },
      },
      TokenInput: {
        type: 'object',
        properties: {
          token: {
            type: 'string',
            description: 'token',
            example: 'random string',
          },
        },
      },
      role: {
        type: 'string',
        enum: ['reader', 'creator'],
        description: 'role of users',
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
      EmailInput: {
        type: 'object',
        required: ['email'],
        properties: {
          email: {
            type: 'string',
            description: 'Email user',
            example: 'team4@gmail.com',
          },
        },
      },
      ResetPasswordInput: {
        type: 'object',
        required: ['newPassword', 'resetPasswordToken'],
        properties: {
          newPassword: {
            type: 'string',
            description: 'New password',
            example: '12345678',
          },
          resetPasswordToken: {
            type: 'string',
            description: 'token',
            example: 'random string',
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

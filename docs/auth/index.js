module.exports = {
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
  '/api/auth/send-email/{role}': {
    post: {
      tags: ['Authentication'],
      description: 'API will send the email for change password',
      operationId: 'forgot-password',
      parameters: [
        {
          name: 'role',
          in: 'path',
          schema: {
            $ref: '#/components/schemas/role',
          },
          required: true,
          description: 'role',
        },
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/EmailInput',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Reset password has been send to your email',
        },
        404: {
          description: 'Email not found!',
        },
        400: {
          description: 'error occurred',
        },
        500: {
          description: 'Server error',
        },
      },
    },
  },
  '/api/auth/reset-password': {
    put: {
      tags: ['Authentication'],
      description: 'Reset password',
      operationId: 'reset-password',
      parameters: [],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ResetPasswordInput',
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Reset password success',
        },
        401: {
          description: 'Unauthorized Users!',
        },
        500: {
          description: 'error occurred',
        },
      },
    },
  },
};

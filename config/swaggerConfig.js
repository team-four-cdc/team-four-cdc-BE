const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'article app docs',
      version: '0.1.0',
      description:
          'This is API docs for article app',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'article-app',
        url: '',
        email: '',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

module.exports = options;

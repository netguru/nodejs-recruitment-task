export default {
  swagger: '2.0',
  info: {
    version: '1.0.0',
    title: 'Movie API',
    description: 'Movie API for the Netguru recruitment task',
  },
  host: 'localhost:3001',
  basePath: '/',
  tags: [
    {
      name: 'Movies',
      description: 'Movie management',
    },
  ],
  schemes: ['http', 'https'],
  securityDefinitions: {
    Bearer: {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
      description: 'Token should be passed following way Authorization: Bearer token',
    },
  },
  consumes: ['application/json'],
  produces: ['application/json'],
  paths: {
    '/movies': {
      get: {
        tags: ['Movies'],
        security: [
          {
            Bearer: [],
          },
        ],
        responses: {
          200: {
            description: 'OK',
            schema: {
              type: 'array',
              items: {
                $ref: '#/definitions/Movie',
              },
            },
          },
          204: {
            description: 'No Content',
          },
          401: {
            description: 'Unauthorized',
          },
        },
      },
      post: {
        tags: ['Movies'],
        parameters: [
          {
            name: 'body',
            in: 'body',
            required: true,
            schema: {
              required: ['title'],
              type: 'object',
              properties: {
                title: {
                  type: 'string',
                  example: 'House',
                },
                year: {
                  type: 'number',
                  example: 2000,
                },
              },
            },
          },
        ],
        responses: {
          201: {
            description: 'Created',
            schema: {
              $ref: '#/definitions/Movie',
            },
          },
          400: {
            description: 'Bad Request',
          },
          401: {
            description: 'Unauthorized',
          },
          403: {
            description: 'Forbidden',
          },
        },
      },
    },
  },
  definitions: {
    Movie: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          example: '1',
        },
        title: {
          type: 'string',
          example: 'House',
        },
        released: {
          type: 'string',
          example: '1986-02-28',
        },
        genre: {
          type: 'array',
          items: {
            type: 'string',
          },
          example: ['Comedy', 'Drama', 'Romance'],
        },
        director: {
          type: 'string',
          example: 'Steve Miner',
        },
        createdAt: {
          type: 'string',
          example: '2021-08-05',
        },
      },
    },
  },
};

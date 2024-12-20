const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Furniture API",
      version: "1.0.0",
      description: "API documentation for the Furniture project",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
      {
        url: "https://furnitureapi-ykrq.onrender.com",
      },
    ],
    components: {
      schemas: {
        Furniture: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "The auto-generated id of the furniture",
            },
            name: {
              type: "string",
              description: "Name of the furniture",
            },
            description: {
              type: "string",
              description: "Description of the furniture",
            },
            price: {
              type: "number",
              description: "Price of the furniture",
            },
          },
        },
        Review: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "The auto-generated id of the review",
            },
            rating: {
              type: "number",
              description: "Rating given by the user",
            },
            comment: {
              type: "string",
              description: "Comment given by the user",
            },
            // Add other properties as needed
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

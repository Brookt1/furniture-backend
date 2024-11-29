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
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

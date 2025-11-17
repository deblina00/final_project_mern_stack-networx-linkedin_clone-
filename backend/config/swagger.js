const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "NetworkX API Docs",
      version: "1.0.0",
      description: "API documentation for NetworkX (LinkedIn Clone)",
    },
    servers: [
      {
        url: "http://localhost:4000/api",
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "token",
        },
      },
    },
  },
  apis: ["./routes/*.js"], // path to all route files
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("Swagger Docs available at: http://localhost:4000/api-docs");
};

module.exports = swaggerDocs;

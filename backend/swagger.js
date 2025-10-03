// swagger.js
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerDocument = require("./swagger.json");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Gerenciamento de Academias",
      version: "1.0.0",
      description: "Documentação da API (logins e rotas protegidas)",
    },
    servers: [
      {
        url: "http://localhost:3000", // endereço do backend
      },
    ],
  },
  apis: ["./router/*.js"], // anotações das rotas
};
function swaggerDocs(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

module.exports = swaggerDocs;

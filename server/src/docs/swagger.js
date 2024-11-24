import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Your API Documentation",
      version: "1.0.0",
      description: "API documentation for your application",
    },
    servers: [
      {
        url: "http://localhost:3000", // Change this to your server URL
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./routes/*.js"], // Path to your route files
};

export const swaggerSpec = swaggerJSDoc(options);


const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "PROCLUB API",
        version: "1.0.0",
        description: "A simple Express Library API",
        termsOfService: "http://example.com/terms/",
        contact: {
          name: "API Support",
          url: "http://www.exmaple.com/support",
          email: "support@example.com",
        },
    
  
      },
      "components": {        
        "securitySchemes": {
          "bearerAuth": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT"
          }
        }
      },
      security: [{ 
        bearerAuth: [], 
    }],
      servers: [
        {
          url: "https://api.klubo.club",
          description: "My API Documentation",
        },
      ],
    },
    apis: ["./routes/swagger.js"],
  };


  
  module.exports = options
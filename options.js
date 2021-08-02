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
  
      servers: [
        {
          url: "http://secure-temple-46604.herokuapp.com",
          description: "My API Documentation",
        },
      ],
    },
    apis: ["./routes/*.js"],
  };

  module.exports = options
import swaggerJSDoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Gestão de Equipamentos',
            version: '1.0.0',
            description: 'API para gerenciamento de equipamentos e manutenções com autenticação JWT'
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Insira o token JWT obtido no endpoint /login'
                }
            }
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor de desenvolvimento'
            }
        ]
    },
    apis: ['./src/routes/*.js', './src/controllers/*.js']
};

export const swaggerSpec = swaggerJSDoc(options);

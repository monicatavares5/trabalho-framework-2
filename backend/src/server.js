import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import { swaggerSpec } from './config/swagger.js';
import { connectDatabase } from './config/database.js';
import equipamentoRouter from "./routes/equipamentoRoute.js";
import manutencaoRouter from "./routes/manutencaoRoute.js";
import authRouter from "./routes/authRoute.js";

const { SERVER_PORT = '3000' } = process.env;
const port = SERVER_PORT;
const app = express();

// Middlewares
app.use(cors()); // Permitir acesso de qualquer origem
app.use(express.json());

// Swagger Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas
app.use("/login", authRouter);
app.use("/equipamentos", equipamentoRouter);
app.use("/manutencao", manutencaoRouter);

// Conectar ao banco e iniciar servidor
const startServer = async () => {
    try {
        await connectDatabase();
        app.listen(port, () => {
            console.log(`API Server rodando no http://localhost:${port}`);
            console.log(`Documentação Swagger disponível em http://localhost:${port}/api-docs`);
        });
    } catch (error) {
        console.error("Erro ao iniciar servidor:", error);
        process.exit(1);
    }
};

startServer();

import { Router } from "express";
import { AuthController } from "../controllers/authController.js";

const authRouter = Router();
const authController = new AuthController();

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       required:
 *         - nome
 *         - email
 *         - senha
 *       properties:
 *         nome:
 *           type: string
 *           example: Monica Leandra
 *         email:
 *           type: string
 *           example: monica@gmail.com
 *         senha:
 *           type: string
 *           example: minhaSenha123
 *
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - senha
 *       properties:
 *         email:
 *           type: string
 *           example: monica@gmail.com
 *         senha:
 *           type: string
 *           example: minhaSenha123
 *
 *     LoginResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Acesso autorizado
 *         data:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 1
 *             accessToken:
 *               type: string
 *               example: eyJhbGciOiJIUzI1NiIsInR...
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realizar login de usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Acesso autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         description: Campos obrigatórios ausentes ou inválidos
 *       401:
 *         description: Email ou senha incorretos
 */
authRouter.post("/", (req, res) => authController.signIn(req, res));

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Cadastrar um novo usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuário criado com sucesso
 *       400:
 *         description: Campos obrigatórios ausentes ou inválidos
 *       409:
 *         description: Usuário já existente
 */
authRouter.post("/register", (req, res) => authController.signUp(req, res));

export default authRouter;

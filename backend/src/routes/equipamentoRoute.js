import { Router } from "express";
import { EquipamentoController } from "../controllers/equipamentoController.js";
import { authMiddleware } from "../middleware/auth.js";

const equipamentoRouter = Router();
const equipamentoController = new EquipamentoController();

// Aplicar autenticação em todas as rotas
equipamentoRouter.use(authMiddleware);

/**
 * @swagger
 * components:
 *   schemas:
 *     Equipamento:
 *       type: object
 *       required:
 *         - nome
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do equipamento
 *         nome:
 *           type: string
 *           description: Nome do equipamento
 *         descricao:
 *           type: string
 *           description: Descrição do equipamento
 *         status:
 *           type: string
 *           description: Status do equipamento
 *           enum: [Disponível, Em uso, Em manutenção]
 *         data_adicionado:
 *           type: string
 *           format: date-time
 *           description: Data de adição do equipamento
 *       example:
 *         nome: Notebook Dell
 *         descricao: Notebook Dell Inspiron 15
 *         status: Disponível
 */

/**
 * @swagger
 * /equipamentos:
 *   get:
 *     summary: Retorna lista de todos os equipamentos
 *     tags: [Equipamentos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de equipamentos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Equipamento'
 *       401:
 *         description: Token inválido ou não informado
 */
equipamentoRouter.get("/", (req, res) => equipamentoController.getAll(req, res));

/**
 * @swagger
 * /equipamentos/{id}:
 *   get:
 *     summary: Retorna detalhes de um equipamento específico
 *     tags: [Equipamentos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do equipamento
 *     responses:
 *       200:
 *         description: Detalhes do equipamento
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Equipamento'
 *       404:
 *         description: Equipamento não encontrado
 */
equipamentoRouter.get("/:id", (req, res) => equipamentoController.getById(req, res));

/**
 * @swagger
 * /equipamentos:
 *   post:
 *     summary: Adiciona um novo equipamento
 *     tags: [Equipamentos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *             properties:
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Equipamento criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Equipamento'
 *       400:
 *         description: Dados inválidos
 */
equipamentoRouter.post("/", (req, res) => equipamentoController.create(req, res));

/**
 * @swagger
 * /equipamentos/{id}:
 *   put:
 *     summary: Atualiza informações de um equipamento
 *     tags: [Equipamentos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do equipamento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Equipamento atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Equipamento'
 *       404:
 *         description: Equipamento não encontrado
 */
equipamentoRouter.put("/:id", (req, res) => equipamentoController.update(req, res));

/**
 * @swagger
 * /equipamentos/{id}:
 *   delete:
 *     summary: Remove um equipamento do inventário
 *     tags: [Equipamentos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do equipamento
 *     responses:
 *       200:
 *         description: Equipamento removido com sucesso
 *       404:
 *         description: Equipamento não encontrado
 */
equipamentoRouter.delete("/:id", (req, res) => equipamentoController.delete(req, res));

export default equipamentoRouter;

import { Router } from "express";
import { ManutencaoController } from "../controllers/manutencaoController.js";
import { authMiddleware } from "../middleware/auth.js";

const manutencaoRouter = Router();
const manutencaoController = new ManutencaoController();

// Aplicar autenticação em todas as rotas
manutencaoRouter.use(authMiddleware);

/**
 * @swagger
 * components:
 *   schemas:
 *     Manutencao:
 *       type: object
 *       required:
 *         - descricao
 *       properties:
 *         id:
 *           type: integer
 *           description: ID da manutenção
 *         equipamento_id:
 *           type: integer
 *           description: ID do equipamento
 *         data:
 *           type: string
 *           format: date-time
 *           description: Data da manutenção
 *         descricao:
 *           type: string
 *           description: Descrição da manutenção
 *         status:
 *           type: string
 *           description: Status da manutenção
 *           enum: [Pendente, Concluída]
 *       example:
 *         descricao: Troca de disco rígido
 *         status: Concluída
 */

/**
 * @swagger
 * /manutencao/{equipamentoId}:
 *   post:
 *     summary: Registra uma manutenção para um equipamento
 *     tags: [Manutenção]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: equipamentoId
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
 *             required:
 *               - descricao
 *             properties:
 *               data:
 *                 type: string
 *                 format: date-time
 *               descricao:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [Pendente, Concluída]
 *     responses:
 *       201:
 *         description: Manutenção registrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Manutencao'
 *       404:
 *         description: Equipamento não encontrado
 *       400:
 *         description: Dados inválidos
 */
manutencaoRouter.post("/:equipamentoId", (req, res) => manutencaoController.create(req, res));

/**
 * @swagger
 * /manutencao/{equipamentoId}:
 *   get:
 *     summary: Retorna histórico de manutenções de um equipamento
 *     tags: [Manutenção]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: equipamentoId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do equipamento
 *     responses:
 *       200:
 *         description: Lista de manutenções do equipamento
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Manutencao'
 *       404:
 *         description: Equipamento não encontrado
 */
manutencaoRouter.get("/:equipamentoId", (req, res) => manutencaoController.getByEquipamento(req, res));

export default manutencaoRouter;

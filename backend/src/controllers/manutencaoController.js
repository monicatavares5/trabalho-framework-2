import { Manutencao } from '../models/manutencao.js';
import { Equipamento } from '../models/equipamento.js';

export class ManutencaoController {

    async create(req, res) {
        try {
            const { equipamentoId } = req.params;
            const { data, descricao, status } = req.body;

            // Verificar se o equipamento existe
            const equipamento = await Equipamento.findByPk(equipamentoId);
            if (!equipamento) {
                return res.status(404).json({
                    message: "Equipamento não encontrado"
                });
            }

            if (!descricao) {
                return res.status(400).json({
                    message: "O campo descrição é obrigatório"
                });
            }

            const novaManutencao = await Manutencao.create({
                equipamento_id: equipamentoId,
                data: data || new Date(),
                descricao,
                status: status || 'Pendente'
            });

            return res.status(201).json(novaManutencao);
        } catch (error) {
            return res.status(500).json({
                message: "Erro ao registrar manutenção",
                error: error.message
            });
        }
    }

    async getByEquipamento(req, res) {
        try {
            const { equipamentoId } = req.params;

            // Verificar se o equipamento existe
            const equipamento = await Equipamento.findByPk(equipamentoId);
            if (!equipamento) {
                return res.status(404).json({
                    message: "Equipamento não encontrado"
                });
            }

            const manutencoes = await Manutencao.findAll({
                where: { equipamento_id: equipamentoId },
                order: [['data', 'DESC']]
            });

            return res.status(200).json(manutencoes);
        } catch (error) {
            return res.status(500).json({
                message: "Erro ao buscar manutenções",
                error: error.message
            });
        }
    }
}

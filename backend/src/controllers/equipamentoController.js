import { Equipamento } from '../models/equipamento.js';

export class EquipamentoController {

    async getAll(req, res) {
        try {
            const equipamentos = await Equipamento.findAll({
                order: [['data_adicionado', 'DESC']]
            });
            return res.status(200).json(equipamentos);
        } catch (error) {
            return res.status(500).json({
                message: "Erro ao buscar equipamentos",
                error: error.message
            });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const equipamento = await Equipamento.findByPk(id);

            if (!equipamento) {
                return res.status(404).json({
                    message: "Equipamento não encontrado"
                });
            }

            return res.status(200).json(equipamento);
        } catch (error) {
            return res.status(500).json({
                message: "Erro ao buscar equipamento",
                error: error.message
            });
        }
    }

    async create(req, res) {
        try {
            const { nome, descricao, status } = req.body;

            if (!nome) {
                return res.status(400).json({
                    message: "O campo nome é obrigatório"
                });
            }

            const novoEquipamento = await Equipamento.create({
                nome,
                descricao,
                status: status || 'Disponível',
                data_adicionado: new Date()
            });

            return res.status(201).json(novoEquipamento);
        } catch (error) {
            return res.status(500).json({
                message: "Erro ao criar equipamento",
                error: error.message
            });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { nome, descricao, status } = req.body;

            const equipamento = await Equipamento.findByPk(id);

            if (!equipamento) {
                return res.status(404).json({
                    message: "Equipamento não encontrado"
                });
            }

            await equipamento.update({
                nome: nome || equipamento.nome,
                descricao: descricao !== undefined ? descricao : equipamento.descricao,
                status: status || equipamento.status
            });

            return res.status(200).json(equipamento);
        } catch (error) {
            return res.status(500).json({
                message: "Erro ao atualizar equipamento",
                error: error.message
            });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;

            const equipamento = await Equipamento.findByPk(id);

            if (!equipamento) {
                return res.status(404).json({
                    message: "Equipamento não encontrado"
                });
            }

            await equipamento.destroy();

            return res.status(200).json({
                message: "Equipamento removido com sucesso"
            });
        } catch (error) {
            return res.status(500).json({
                message: "Erro ao remover equipamento",
                error: error.message
            });
        }
    }
}

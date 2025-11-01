import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';
import { Equipamento } from './equipamento.js';

export class Manutencao extends Model {}

Manutencao.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    equipamento_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'equipamentos',
            key: 'id'
        }
    },
    data: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Pendente'
    }
}, {
    sequelize,
    tableName: 'manutencoes',
    timestamps: false
});

// Definir relacionamentos
Equipamento.hasMany(Manutencao, {
    foreignKey: 'equipamento_id',
    as: 'manutencoes'
});

Manutencao.belongsTo(Equipamento, {
    foreignKey: 'equipamento_id',
    as: 'equipamento'
});

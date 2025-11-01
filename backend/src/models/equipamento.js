import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export class Equipamento extends Model {}

Equipamento.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Disponível'
    },
    data_adicionado: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    tableName: 'equipamentos',
    timestamps: false
});

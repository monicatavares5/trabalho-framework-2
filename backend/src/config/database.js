import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false,
});

export const connectDatabase = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log("Conexão com o banco de dados estabelecida com sucesso.");
    } catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error);
    }
};

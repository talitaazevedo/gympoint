// Passo 03 => criando Migrations que são tabelas
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('students', {
            // Definindo objetos da tabela
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            nome: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            idade: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },

            peso: {
                type: Sequelize.DECIMAL,
                allowNull: false,
            },
            altura: {
                type: Sequelize.DECIMAL,
                allowNull: false,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('students');
    },
};

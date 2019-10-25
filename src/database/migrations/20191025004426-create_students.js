//Passo 03 => criando Migrations que são tabelas
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('users');
    },
};

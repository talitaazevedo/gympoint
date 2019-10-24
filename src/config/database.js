// 02=> passo conffiguando a database

// esta interface não consegue ler arquivos com export default
module.exports = {
    // este arquivo é acessado tanto pelo sequelize quanto pela aplicação
    // tipo de base de dados
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'docker',
    database: 'gympoint',
    define: {
        // Garante que terei uma coluna created at updated
        timestamps: true,

        underscored: true,
        // não é o padrão camel case diz ao codigo que eu prefiro underline
        underscoredAll: true,
    },
};

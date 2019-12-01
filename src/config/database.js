// 02=> passo conffiguando a database

// esta interface não consegue ler arquivos com export default
module.exports = {
    // este arquivo é acessado tanto pelo sequelize quanto pela aplicação
    // tipo de base de dados
    dialect: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    define: {
        // Garante que terei uma coluna created at updated
        timestamps: true,

        underscored: true,
        // não é o padrão camel case diz ao codigo que eu prefiro underline
        underscoredAll: true,
    },
};

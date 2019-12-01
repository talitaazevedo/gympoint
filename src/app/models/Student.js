// Criando Model de Student
import Sequelize, { Model } from 'sequelize';

class Student extends Model {
    static init(sequelize) {
        // Estamos enviando colunas através de um objeto
        super.init(
            {
                nome: Sequelize.STRING,
                idade: Sequelize.INTEGER,
                email: Sequelize.STRING,
                peso: Sequelize.DOUBLE,
                altura: Sequelize.DOUBLE,
            },
            { sequelize }
        );
        this.addHook('beforeSave', student => {
            if (student.altura) {
                student.altura *= 100;
            }
            if (student.peso) {
                student.peso *= 1000;
            }
        });
        return this;
    }
}
export default Student;

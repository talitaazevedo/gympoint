import { Model } from 'sequelize';

class Plan extends Model {
    static init(sequelize) {
        super.init(
            {
                title: Sequelize.STRING,
                duration: Sequelize.INTEGER,
                price: Sequelize.REAL,
            },
            { sequelize }
        );
    }
}

export default Plan;

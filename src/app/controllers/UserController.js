import * as Yup from 'yup';
import User from '../models/User';

class UserController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().required(),
            password: Yup.string()
                .min(6)
                .required(),
        });
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Invalid validation' });
        }
        const userExists = await User.findOne({
            where: { email: req.body.email },
        });
        if (userExists) {
            return res.status(400).json({ error: 'User already Exists.' });
        }
        const { id, name, email, password } = await User.create(req.body);

        return res.json({
            id,
            name,
            email,
            password,
        });
    }
}

export default new UserController();

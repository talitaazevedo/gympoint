import * as Yup from 'yup';
import Student from '../models/Student';

class StudentController {
    async store(req, res) {
        const schema = Yup.object().shape({
            nome: Yup.string().required(),
            idade: Yup.number()
                .positive()
                .required(),
            email: Yup.string().required(),
        });
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Invalid validation' });
        }
        const studentExists = await Student.findOne({
            where: { email: req.body.email },
        });
        if (studentExists) {
            return res.status(400).json({ error: 'Student already Exists.' });
        }
        const { id, nome, idade, email, peso, altura } = await Student.create(
            req.body
        );

        return res.json({
            id,
            nome,
            idade,
            email,
            peso,
            altura,
        });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            nome: Yup.string(),
            email: Yup.string().email(),
            idade: Yup.number()
                .positive()
                .integer(),
            peso: Yup.number().positive(),
            altura: Yup.number().positive(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { email } = req.body;

        const student = await Student.findOne({ where: { email } });

        if (!student) {
            return res.status(400).json({ error: 'Student does not exists.' });
        }

        const { nome, idade, peso, altura } = await student.update(req.body);

        return res.json({
            nome,
            idade,
            email,
            peso,
            altura,
        });
    }
}

export default new StudentController();

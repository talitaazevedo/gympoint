import * as Yup from 'yup';

import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

import HelpOrderMail from '../jobs/HelpOrderMail';

import Queue from '../../lib/Queue';

class HelpOrderController {
    async index(req, res) {
        const { page = 1 } = req.query;
        const { id } = req.params;

        const student = await Student.findByPk(id);
        if (!student) {
            return res.status(400).json({ error: 'Student already Exists.' });
        }
        const helpOrder = await HelpOrder.findAll({
            where: {
                student_id: id,
            },
            order: ['id'],
            limit: 20,
            offset: (page - 1) * 20,
        });
        return res.json(helpOrder);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            question: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validations Fails' });
        }
        const student = await Student.findByPk(req.params.id);
        if (!student) {
            return res.status(400).json({ error: 'Student Already exists' });
        }
        const { question } = req.body;
        const helpOrder = await HelpOrder.create({
            student_id: req.params.id,
            question,
        });

        return res.json(helpOrder);
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            answer: Yup.string().required(),
        });
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }
        const { id } = req.params;
        const helpOrder = await HelpOrder.findByPk(id);
        if (!helpOrder) {
            return res
                .status(400)
                .json({ error: 'Help order does not exists.' });
        }

        const student = await Student.findByPk(helpOrder.student_id);
        const { answer } = req.body;
        const answer_at = new Date();

        HelpOrder.update({
            answer,
            answer_at,
        });
        Queue.add(HelpOrderMail.key, {
            helpOrder,
            student,
        });
        return res.json(helpOrder);
    }
}

export default new HelpOrderController();

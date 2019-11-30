import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
    async index(req, res) {
        const { page = 1 } = req.query;
        const plans = await Plan.findAll({
            order: ['id'],
            attributes: ['id', 'title', 'duration', 'price'],
            limit: 20,
            offset: (page - 1) * 20,
        });
        return res.json(plans);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            title: Yup.string().required(),
            duration: Yup.number().required(),
            price: Yup.number().required(),
        });
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation Fails' });
        }
        /**
         * Check If Plan Exists
         */
        const planExists = await Plan.findOne({
            where: {
                title: req.body.title,
                duration: req.body.duration,
                price: req.body.price,
            },
        });

        if (planExists) {
            return res.status(400).json({ error: 'Plan already exists!' });
        }
        /**
         * Aplying creation next the validation
         */

        const { id, title, duration, price } = await Plan.create(req.body);

        return res.json({
            id,
            title,
            duration,
            price,
        });
    }

    async update(req, res) {
        /**
         * Schema Yup validation
         */
        const schema = Yup.object().shape({
            title: Yup.string().required(),
            duration: Yup.number().required(),
            price: Yup.number().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation  Fails' });
        }

        /**
         * Find Plans
         */

        const plan = await Plan.findByPk(req.params.id);

        if (!plan) {
            return res.status(400).json({ error: ' Plan not exists !' });
        }
        /**
         * Check Plan Exists before update
         */
        const planExists = await Plan.findOne({
            where: {
                title: req.body.title,
                duration: req.body.duration,
                price: req.body.price,
            },
        });

        if (planExists) {
            return res.status(400).json({ error: 'Plan already exists!' });
        }
        /**
         * Aplying update
         */

        const { title, duration, price } = await Plan.update(req.body, {
            where: { id: req.params.id },
        });

        return res.json({
            title,
            duration,
            price,
        });
    }

    async delete(req, res) {
        const planExists = await Plan.findByPk(req.params.id);
        if (!planExists) {
            return res.status(404).json({ error: 'Plan not exists!' });
        }
        return res.json({ message: 'Plan deleted with success!' });
    }
}

export default new PlanController();

import { Router } from 'express';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import UserController from './app/controllers/UserController';
import PlanController from './app/controllers/PlanController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// Controle de Sessões

routes.post('/sessions', SessionController.store);

routes.get('/users', UserController.index);

routes.post('/students/:id/checkins');
routes.get('/students/:id/checkins');

// criação e update de estudantes

routes.post('/students', StudentController.store);
routes.put('/students', StudentController.update);

routes.post('/users', UserController.store);

/**
 * Gestão de Planos
 */

// List
routes.get('/plans', PlanController.index);
// Create
routes.post('/plans/', PlanController.store);
// update
routes.put('/plans/:id', PlanController.update);

/**
 * Daqui para baixo tudo com autenticação
 */

routes.use(authMiddleware);

routes.put('/users', UserController.update);

export default routes;

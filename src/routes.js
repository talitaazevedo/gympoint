import { Router } from 'express';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import UserController from './app/controllers/UserController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// criação e atualização de usuário
routes.post('/users', UserController.store);
routes.put('/users', UserController.update);

// Controle de Sessões

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

// criação e update de estudantes

routes.post('/students', StudentController.store);
routes.put('/students', StudentController.update);

export default routes;

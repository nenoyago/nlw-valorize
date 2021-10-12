import { Router } from 'express';

import { tagsRoutes } from './tags.routes';
import { usersRoutes } from './users.routes';
import { complimentsRoutes } from './compliments.routes';
import { authenticateRoutes } from './authenticate.routes';

const routes = Router();

routes.use(authenticateRoutes);

routes.use('/users', usersRoutes);
routes.use('/tags', tagsRoutes);
routes.use('/compliments', complimentsRoutes);

export { routes };

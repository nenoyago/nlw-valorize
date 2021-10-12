import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

import { CreateUserController } from '../useCases/createUser/CreateUserController';
import { ListUserSendComplimentsController } from '../useCases/listUserSendCompliments/ListUserSendComplimentsController';
import { ListUserReceiveComplimentsController } from '../useCases/listUserReceiveCompliments/ListUserReceiveComplimentsController';
import { ListUsersController } from '../useCases/listUsers/ListUsersController';

const usersRoutes = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const listUserSendComplimentsController =
  new ListUserSendComplimentsController();
const listUserReceiveComplimentsController =
  new ListUserReceiveComplimentsController();

usersRoutes.post('/', createUserController.handle);
usersRoutes.get('/', ensureAuthenticated, listUsersController.handle);
usersRoutes.get(
  '/compliments/send',
  ensureAuthenticated,
  listUserSendComplimentsController.handle
);
usersRoutes.get(
  '/compliments/receive',
  ensureAuthenticated,
  listUserReceiveComplimentsController.handle
);

export { usersRoutes };

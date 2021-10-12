import { Router } from 'express';

import { AuthenticateUserController } from '../useCases/authenticateUser/AuthenticateUserController';
import { RefreshTokenController } from '../useCases/refreshToken/RefreshTokenController';

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

const authenticateRoutes = Router();

authenticateRoutes.post('/sessions', authenticateUserController.handle);
authenticateRoutes.post('/refresh-token', refreshTokenController.handle);

export { authenticateRoutes };

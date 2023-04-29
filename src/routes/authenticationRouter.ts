import { Router } from 'express';
import * as authController from '../controllers/authenticationController';
import passport from '../passport';

const router = Router();
router.get('/login', authController.loginPageController);
router.post('/login', authController.loginController);
router.get('/registration', authController.regPageController);
router.post('/registration', authController.registerController);
router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);
router.get(
  `/auth/google/blog`,
  passport.authenticate('google', { failureRedirect: '/' }),
  authController.providerLoginController
);
router.get(
  '/auth/github',
  passport.authenticate('github', { scope: ['user'] })
);
router.get(
  `/auth/github/blog`,
  passport.authenticate('github', { failureRedirect: '/' }),
  authController.providerLoginController
);
export default router;
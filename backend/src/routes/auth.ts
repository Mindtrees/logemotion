import express from 'express';
import passport from '../middleware/passport';
import { googleCallback, logout, getCurrentUser } from '../controllers/authController';

const router = express.Router();

router.get('/google', 
  passport.authenticate('google', { 
    scope: ['profile', 'email'] 
  })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/error' }),
  googleCallback
);

router.post('/logout', logout);

router.get('/me', getCurrentUser);

router.get('/error', (req, res) => {
  res.json({ error: 'Authentication failed' });
});

export default router;
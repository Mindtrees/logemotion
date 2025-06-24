import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '../models/User';

export const googleCallback = (req: Request, res: Response) => {
  try {
    const user = req.user as IUser;
    
    const token = jwt.sign(
      { 
        userId: user._id,
        email: user.email,
        name: user.name 
      },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );
    
    
    res.redirect(`http://localhost:3000/auth/success?token=${token}`);
  } catch (error) {
    console.error('Google callback error:', error);
    res.redirect('http://localhost:3000/auth/error');
  }
};

export const logout = (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.json({ message: 'Logged out successfully' });
  });
};

export const getCurrentUser = (req: Request, res: Response) => {
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
};
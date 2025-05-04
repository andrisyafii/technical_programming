import { Request, Response, NextFunction } from 'express';
import firebase from '../config/firebaseConfig';

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authMiddleware = async (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    
    // Verify token
    const decodedToken = await firebase.auth().verifyIdToken(token);
    
    if (!decodedToken) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
    
    // Add user info to request object
    req.user = decodedToken;
    
    next();
  } catch (error) {
    console.error('Auth error:', error);
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};
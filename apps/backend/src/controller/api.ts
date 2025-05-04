import { Request, Response } from 'express';
import { getUserById, updateUser } from '../repository/userCollection';

export const fetchUserData = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    
    const user = await getUserById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    return res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateUserData = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const userData = req.body;
    
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    
    const updatedUser = await updateUser(userId, userData);
    
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user data:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
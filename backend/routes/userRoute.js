import express  from 'express';
import { loginUser, registerUser, adminLogin, getCurrentUser } from '../controllers/userController.js';
import adminAuth from '../middleware/adminAuth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser);
userRouter.post('/admin', adminLogin);
userRouter.get('/me', getCurrentUser);
userRouter.get('/admin/test', adminAuth, (req, res) => {
  res.json({ success: true, message: 'Admin authentication working', user: req.user });
});

export default userRouter;
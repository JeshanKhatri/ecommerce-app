import express from 'express';
import { handleEsewaCallback } from '../controllers/paymentController.js';
import userAuth from '../middleware/userAuth.js';

const paymentRouter = express.Router();

paymentRouter.post('/callback', handleEsewaCallback);

export default paymentRouter;

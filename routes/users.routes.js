import express from 'express';
const userRouter = express.Router();
import multer from 'multer';

import {
	getAllUsers,
	getUserById,
	updateUserById,
	deleteUserById,
	getResumeById,
	checkUserExists,
	registerUser,
	loginUser,
	generateToken,
	sendEmail,
	resetPassword,
} from '../controller/users.controller.js';
import { authMiddleware } from '../middlewear/authorization.js';

// GET /users
userRouter.get('/', getAllUsers);

// GET /users/:id
userRouter.get('/:id', authMiddleware, getUserById);

// GET /users/:id
userRouter.get('/resume/:id', authMiddleware, getResumeById);

// POST /users/create  create new user
userRouter.post('/register', multer().single('resume'), registerUser);

// POST /users/login  Login the user
userRouter.post('/login', loginUser);

// POST /users/login  Login the user
userRouter.post('/generate-token', generateToken);

// POST /users/check  check if user exists
userRouter.post('/check', checkUserExists);

// POST /verify-otp verify otp
userRouter.post('/send-otp-email', sendEmail);

// PUT /users/:id
userRouter.put(
	'/:id',
	authMiddleware,
	multer().single('resume'),
	updateUserById
);

// DELETE /users/:id
userRouter.delete('/:id', authMiddleware, deleteUserById);

// PUT /users/reset-password
userRouter.put('/reset-password', resetPassword);

export default userRouter;

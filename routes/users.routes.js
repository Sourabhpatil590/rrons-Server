import express from 'express';
const userRouter = express.Router();
import multer from 'multer';

import {
	createUser,
	getAllUsers,
	getUserById,
	updateUserById,
	deleteUserById,
	getResumeById,
	checkUserExists,
} from '../controller/users.controller.js';

// GET /users
userRouter.get('/', getAllUsers);

// GET /users/:id
userRouter.get('/:id', getUserById);

// GET /users/:id
userRouter.get('/resume/:id', getResumeById);

// POST /users/create  create new user
userRouter.post('/create', multer().single('resume'), createUser);

// POST /users/check  check if user exists
userRouter.post('/check', checkUserExists);

// PUT /users/:id
userRouter.put('/:id', multer().single('resume'), updateUserById);

// DELETE /users/:id
userRouter.delete('/:id', deleteUserById);

export default userRouter;

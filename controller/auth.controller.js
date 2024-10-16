import User from '../models/users.model';
const express = require('express');
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Register Route
// router.post('/register', async (req, res) => {

const registerUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		let user = await User.findOne({ email });
		if (user) {
			return res.status(400).json({ msg: 'User already exists' });
		}

		user = new User({ email, password });

		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(password, salt);

		await user.save();

		const payload = {
			user: { id: user._id },
		};

		jwt.sign(
			payload,
			process.end.jwtSecret,
			{ expiresIn: 3600 },
			(err, token) => {
				if (err) throw err;
				res.json({ token });
			}
		);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
};

// router.post('/login', async (req, res) => {

const loginUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		// Check if the user exists
		let user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ msg: "User doesn't exist" });
		}

		// Validate password
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ msg: 'Invalid credentials' });
		}

		// Generate JWT token
		const payload = {
			user: {
				id: user.id,
			},
		};

		jwt.sign(
			payload,
			config.jwtSecret,
			{ expiresIn: 3600 },
			(err, token) => {
				if (err) throw err;
				res.json({ token });
			}
		);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
};

export { registerUser, loginUser };

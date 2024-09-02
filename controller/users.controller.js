import User from '../models/users.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// register a new user
const registerUser = async (req, res) => {
	const body = req.body;
	try {
		if ((await User.findOne({ email: req.body.email })) !== null) {
			return res.status(404).json({ error: 'User already exists' });
		}
		let payload = {
			...body,
			address: {
				village: body.village,
				taluka: body.taluka,
				district: body.district,
				state: body.state,
			},
			password: await bcrypt.hash(body.password, 12),
			resume: { data: req.file.buffer, contentType: req.file.mimetype },
		};

		const user = await User.create(payload);

		if (!user) {
			return res.status(404).json({ error: 'User not created' });
		}
		const token = jwt.sign(
			{ email: user.email, id: user._id },
			process.env.JWT_SECRET,
			{
				expiresIn: 3600,
			}
		);
		res.status(200).json({ token });
	} catch (error) {
		res.status(403).json({ error: error.message });
	}
};

const loginUser = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(204).json({ data: 'User not found' });
		}
		console.log('user:', user.password, password);
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(401).json({ data: 'Invalid credentials' });
		}

		const token = jwt.sign(
			{ email: user.email, id: user._id },
			process.env.JWT_SECRET,
			{
				expiresIn: '1h',
			}
		);
		res.status(200).json({ token });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const generateToken = async (req, res) => {
	const { email } = req.body;
	const user = await User.findOne({ email });

	try {
		const token = jwt.sign(
			{ email: user.email, id: user._id },
			process.env.JWT_SECRET,
			{
				expiresIn: '1h',
			}
		);
		res.status(200).json({ token });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// check if user exists
const checkUserExists = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (!user) {
			return res.status(204).json({ data: 'User not found' });
		} else {
			res.status(201).json({ _id: user._id });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Get all users
const getAllUsers = async (req, res) => {
	try {
		const users = await User.find();
		users.forEach((user) => {
			user.resume = undefined;
		});
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Get a single user by ID
const getUserById = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}
		user.resume = undefined;
		res.status(200).json(user);
	} catch (error) {
		res.status(404).json({
			error: error.message,
		});
	}
};

// Get a resume by ID
const getResumeById = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		let buffer = Buffer.from(user.resume.data, 'base64');
		res.status(200).send({ data: buffer });
	} catch (error) {
		res.status(404).json({
			error: error.message,
		});
	}
};

// Update a user by ID
const updateUserById = async (req, res) => {
	let body = {};
	// console.log('buffer:', req.file.buffer);
	if (!req.file) {
		body = req.body;
	} else {
		body = {
			...req.body,
			resume: {
				data: req.file.buffer,
				contentType: req.file.mimetype,
			},
		};
	}

	try {
		const updatedUser = await User.findByIdAndUpdate(req.params.id, body);
		if (!updatedUser) {
			return res.status(404).json({ error: 'User not found' });
		}
		// console.log('updated user', updatedUser.resume);
		res.status(200).json(updatedUser);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Delete a user by ID
const deleteUserById = async (req, res) => {
	try {
		const deletedUser = await User.findByIdAndDelete(req.params.id);
		if (!deletedUser) {
			return res.status(404).json({ error: 'User not found' });
		}
		res.status(200).json({ message: 'User deleted successfully' });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export {
	loginUser,
	registerUser,
	checkUserExists,
	getAllUsers,
	getUserById,
	updateUserById,
	getResumeById,
	deleteUserById,
	generateToken,
};

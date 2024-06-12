import User from '../models/users.model.js';

// Create a new user
const createUser = async (req, res) => {
	// console.log(req.body);
	try {
		if ((await User.findOne({ email: req.body.email })) !== null) {
			// console.log(await User.findOne({ email: req.body.email }));
			return res.status(404).json({ error: 'User already exists' });
		}

		const user = await User.create({
			address: {
				village: req.body.village,
				taluka: req.body.taluka,
				district: req.body.district,
				state: req.body.state,
			},
			resume: { data: req.file.buffer, contentType: req.file.mimetype },
			...req.body,
		});
		user.resume = undefined;
		res.status(201).json({ _id: user._id });
	} catch (error) {
		res.status(403).json({ error: error.message });
	}
};

// check if user exists
const checkUserExists = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		// console.log((await User.findOne({ email: req.body.email })) === null);
		if ((await User.findOne({ email: req.body.email })) === null) {
			return res.status(204).json({ data: 'User not found' }); //204 no content
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
		// user.resume = undefined;
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
		// res.status(200).send({
		// 	data: buffer,
		// 	contentType: user.resume.contentType,
		// });
		// console.log('created buffer', buffer);
		// fs.writeFileSync('./resume.pdf', buffer);

		// Send the PDF as a response
		// fs.readFile('resume.pdf', function (err, data) {
		// 	if (err) {
		// 		console.error('Failed to read PDF file:', err);
		// 		res.status(500).json({ error: 'Failed to read PDF file' });
		// 		return;
		// 	}
		// 	res.setHeader('Content-Type', 'application/pdf');
		// 	res.setHeader(
		// 		'Content-Disposition',
		// 		'attachment; filename="resume.pdf"'
		// 	);
		// 	console.log('sending data', data)
		// 	res.status(200).send(data);

		// Clean up temporary files
		// fs.unlink('resume.pdf', function (err) {
		// 	if (err) {
		// 		console.error('Failed to delete temporary file:', err);
		// 		res.status(404).json({
		// 			error: 'Failed to delete temporary file',
		// 		});
		// 	}
		// });
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
	createUser,
	checkUserExists,
	getAllUsers,
	getUserById,
	updateUserById,
	getResumeById,
	deleteUserById,
};

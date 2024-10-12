import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
	console.log(
		'authMiddleware token:'
		// req.headers.authorization,
		// req.headers
		// req
	);
	const token = req.headers.authorization.split(' ')[1];
	if (!token)
		return res.status(401).json({ msg: 'No token, authorization denied' });
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded;
		next();
	} catch (e) {
		console.log('authMiddleware error:', e);
		res.status(400).json({ msg: 'Token is not valid' });
	}
};

export { authMiddleware };

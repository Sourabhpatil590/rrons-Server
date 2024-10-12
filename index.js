import express from 'express';
import multer from 'multer';
import bodyParser from 'body-parser';
// import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './routes/users.routes.js';
import jobRouter from './routes/jobs.routes.js';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log('Connected to MongoDB Atlas');
		app.listen(process.env.PORT, () => {
			console.log(`Server is running on port ${process.env.PORT}`);
		});
	})
	.catch((error) => {
		console.log('Error connecting to MongoDB Atlas:', error);
	});

// middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/resumes', express.static('resumes'));
app.use(cors());

// routers
app.use('/api/users', userRouter);
app.use('/api/jobs', jobRouter);

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './resumes');
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});
const upload = multer({ storage: storage }).single('resume');

app.post('/verify-otp', (req, res) => {
	upload(req, res, (err) => {
		if (err) {
			console.log(err);
			return res.status(500).end('Error uploading file');
		} else {
			console.log(req.body);
			let emailID = req.body.emailID;
			let otp = req.body.otp;

			console.log(emailID, otp);
			let transporter = nodemailer.createTransport({
				service: 'gmail',
				auth: {
					user: 'rrons.manpowersol@gmail.com',
					pass: process.env.EMAIL_PASS,
				},
			});

			let mailOptions = {
				from: 'rrons.manpowersol@gmail.com',
				// to: process.env.TO,
				to: emailID,
				subject: `OTP for resetting password`,
				// text: `Inquiry for position ${position}\n
				// These are the Details:\n
				// Name: ${name}\n
				// Email: ${emailID}\n
				// Skills: ${skills}\n
				// Education: ${education}\n
				// Salary: ${salary}\n
				// Experience: ${experience}
				// Please find the resume attached below`,
				text: `Your OTP for resetting password is ${otp}`,
				// attachments: [
				// 	{
				// 		path: path,
				// 	},
				// ],
			};
			transporter.sendMail(mailOptions, (err, info) => {
				if (err) {
					console.log(err);
					res.send('error');
				} else {
					console.log('Email sent: ' + info.response);
					res.send('success');
				}
			});

			fs.unlink(path, (err) => {
				if (err) {
					console.log(err);
				} else {
					console.log('File deleted successfully');
					res.send('success');
					// res.redirect('localhost:3000');
				}
			});
		}
	});
});

const multerStorage = multer.memoryStorage();
const uploadFile = multer({ storage: multerStorage });

app.get('/', (req, res) => {
	res.send('Hello World');
});

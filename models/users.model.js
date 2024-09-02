import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
	_id: false, // <-- disable _id
	village: String,
	taluka: String,
	district: String,
	state: String,
});

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		contact: {
			type: Number,
			required: true,
		},
		address: {
			type: addressSchema,
			// required: true,
		},
		skills: {
			type: Array,
			// required: true,
		},
		qualification: {
			type: String,
			// required: true,
		},
		collage: {
			type: String,
			// required: true,
		},
		collageGrade: {
			type: String,
			// required: true,
		},
		passingYear: {
			type: String,
			// required: true,
		},
		currentCompany: {
			type: String,
			// required: true,
		},
		designation: {
			type: String,
			// required: true,
		},
		experienceInYears: {
			type: String,
			// required: true,
		},
		experienceInMonths: {
			type: String,
			// required: true,
		},
		location: {
			type: String,
			// required: true,
		},
		workExperience: {
			type: String,
			// required: true,
		},
		currentSalary: {
			type: String,
			// required: true,
		},
		expectedSalary: {
			type: String,
			// required: true,
		},
		resume: {
			data: Buffer,
			contentType: String,
		},
		noticePeriod: {
			type: String,
			// required: true
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model('User', userSchema);

export default User;

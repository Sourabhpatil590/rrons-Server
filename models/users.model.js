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
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
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
		education: {
			type: String,
			// required: true,
		},
		experience: {
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

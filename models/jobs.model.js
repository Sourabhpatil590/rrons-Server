import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			// required: true,
		},
		description: {
			type: String,
			// required: true,
		},
		company: {
			type: String,
			// required: true,
		},
		location: {
			type: String,
			// required: true,
		},
		skills: {
			type: String,
			// required: true,
		},
		salary: {
			type: String,
			// required: true,
		},
		experience: {
			type: String,
			// required: true,
		},
		qualification: {
			type: String,
			// required: true,
		},
		status: {
			type: String,
			// default: 'open',
		},
		category: {
			type: String,
			// required: true,
		},
		vacancy: {
			type: Number,
			// required: true,
		},

		appliedCandidates: {
			type: Array,
			unique: true,
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

const Job = mongoose.model('Job', jobSchema);

export default Job;

import Job from '../models/jobs.model.js';
import User from '../models/users.model.js';

const getAllJobs = async (req, res) => {
	try {
		let limit = parseInt(req.query.limit);

		let query = {};
		if (req.query.status) {
			query.status = req.query.status;
		}
		if (req.query.category && req.query.category !== 'null') {
			query.category = req.query.category;
		}
		const jobs = await Job.find(query).limit(limit);

		res.status(200).json(jobs);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getJobById = async (req, res) => {
	try {
		const job = await Job.findById(req.params.id);
		if (!job) {
			return res.status(404).json({ error: 'Job not found' });
		}
		res.status(200).json(job);
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
};

const createJob = async (req, res) => {
	try {
		const job = new Job({
			...req.body,
		});
		const response = await job.save();
		res.status(201).json(response);
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
};

const updateJob = async (req, res) => {
	try {
		const job = await Job.findByIdAndUpdate(req.params.id, req.body);
		if (!job) {
			return res.status(404).json({ error: 'Job not found' });
		}

		const response = await job.save();
		res.status(201).json(response);
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
};

const closePosition = async (req, res) => {
	try {
		const job = await Job.findById(req.params.id);
		if (!job) {
			return res.status(404).json({ error: 'Job not found' });
		}
		job.status = 'closed';
		const response = await job.save();
		res.status(201).json(response);
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
};

const reOpenPosition = async (req, res) => {
	try {
		const job = await Job.findById(req.params.id);
		if (!job) {
			return res.status(404).json({ error: 'Job not found' });
		}
		job.status = 'open';
		const response = await job.save();
		res.status(201).json(response);
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
};

const appliedCandidates = async (req, res) => {
	try {
		const job = await Job.findById(req.params.id);
		if (!job) {
			return res.status(404).json({ error: 'Job not found' });
		}
		let candidates = await User.find({
			_id: { $in: job.appliedCandidates },
		});

		res.status(201).json({ list: candidates, job: job });
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
};
const applyJob = async (req, res) => {
	try {
		if (req.body.candidate === null || req.body.candidate === undefined) {
			{
				return res
					.status(400)
					.json({ error: 'Candidate ID not found' });
			}
		}
		const job = await Job.findById(req.params.id);
		if (!job) {
			return res.status(404).json({ error: 'Job not found' });
		}
		if (job.appliedCandidates.includes(req.body.candidate)) {
			return res.status(400).json({ error: 'Candidate already applied' });
		}
		job.appliedCandidates.push(req.body.candidate);
		const response = await job.save();
		res.status(201).json(response);
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
};

export {
	createJob,
	getAllJobs,
	getJobById,
	updateJob,
	closePosition,
	applyJob,
	appliedCandidates,
	reOpenPosition,
};

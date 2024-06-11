import express from 'express';
const jobRouter = express.Router();
import {
	getAllJobs,
	getJobById,
	createJob,
	updateJob,
	closePosition,
	applyJob,
	appliedCandidates,
	reOpenPosition,
} from '../controller/jobs.controller.js';

// GET /jobs
jobRouter.get('/', getAllJobs);

// GET /jobs/:id
jobRouter.get('/:id', getJobById);

// POST /jobs/create  create new job
jobRouter.post('/', createJob);

// PUT /jobs/:id
jobRouter.put('/:id', updateJob);

// DELETE /jobs/:id
jobRouter.delete('/:id', closePosition);

// re-open /jobs/re-open/:id
jobRouter.put('/re-open/:id', reOpenPosition);

// apply for job
jobRouter.post('/apply/:id', applyJob);

// get applied candidates
jobRouter.get('/applied-candidates/:id', appliedCandidates);

export default jobRouter;

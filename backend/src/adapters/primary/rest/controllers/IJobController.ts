import { Request, Response } from 'express';
import { JobRepository } from '../../../secondary/db/JobRepository';
import { MongooseUserRepository } from '../../../secondary/db/MongooseUserRepository';
import { PostJob } from '../../../../domain/use-cases/PostJob';
import { GetJobs } from '../../../../domain/use-cases/GetJobs';
import { GetJobById } from '../../../../domain/use-cases/GetJobsById';
import { UpdateJob } from '../../../../domain/use-cases/UpdateJobs';
import { DeleteJob } from '../../../../domain/use-cases/DeleteJob';
import { GetRecruiterJobs } from '../../../../domain/use-cases/GetRecruiterJobs';
import mongoose from 'mongoose';

interface AuthRequest extends Request {
    user?: {
        id: string;
        email?: string;
        role?: string;
    };
}

export class JobController {
    private jobRepo: JobRepository;
    private userRepo: MongooseUserRepository;

    // ✅ Constructor accepts both repositories
    constructor(jobRepo: JobRepository, userRepo: MongooseUserRepository) {
        this.jobRepo = jobRepo;
        this.userRepo = userRepo;
    }

    // POST /api/jobs
    async createJob(req: AuthRequest, res: Response) {
        try {
            const recruiterId = req.user?.id;
            
            if (!recruiterId) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            const job = {
                id: new mongoose.Types.ObjectId().toString(),
                recruiterId,
                ...req.body,
                createdAt: new Date(),
                updatedAt: new Date()
            };

            const useCase = new PostJob(this.jobRepo, this.userRepo);
            const created = await useCase.execute(job);
            
            res.status(201).json(created);
        } catch (error: any) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    }

    // GET /api/jobs
    async getAllJobs(req: Request, res: Response) {
        try {
            const useCase = new GetJobs(this.jobRepo);
            const jobs = await useCase.execute();
            res.json(jobs);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    // GET /api/jobs/:id
    async getJobById(req: Request, res: Response) {
        try {
            const useCase = new GetJobById(this.jobRepo);
            const job = await useCase.execute(req.params.id);
            res.json(job);
        } catch (error: any) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    }

    // PATCH /api/jobs/:id
    async updateJob(req: AuthRequest, res: Response) {
        try {
            const recruiterId = req.user?.id;
            
            if (!recruiterId) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            const useCase = new UpdateJob(this.jobRepo);
            const job = await useCase.execute(req.params.id, recruiterId, req.body);
            res.json(job);
        } catch (error: any) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    }

    // DELETE /api/jobs/:id
    async deleteJob(req: AuthRequest, res: Response) {
        try {
            const recruiterId = req.user?.id;
            
            if (!recruiterId) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            const useCase = new DeleteJob(this.jobRepo);
            await useCase.execute(req.params.id, recruiterId);
            res.status(204).send();
        } catch (error: any) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    }

    // GET /api/jobs/recruiter/me
    async getJobsByRecruiter(req: AuthRequest, res: Response) {
        try {
            const recruiterId = req.user?.id;

            if (!recruiterId) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            const useCase = new GetRecruiterJobs(this.jobRepo);
            const jobs = await useCase.execute(recruiterId);
            res.json(jobs);
        } catch (error: any) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    }
}
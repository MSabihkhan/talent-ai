// domain/models/Profile.ts

export interface ILink {
    github?: string;
    linkedin?: string;
    portfolio?: string;
}

export interface IExperience {
    title: string;
    company: string;
    timeline: string;
    description: string;
}

export interface IEducation {
    degree: string;
    institute: string;
    duration: string;
}

export interface ICandidateProfile {
    id: string;
    userId: string;
    about: string;
    skills: string[];
    links: ILink;
    experience: IExperience[];
    yearsOfExperience: number;
    education: IEducation[];
    certifications: string[];
    applicationsSent: number;
    profileViews: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface ParsedCvData {
    about: string;
    skills: string[];
    links: ILink;
    experience: IExperience[];
    yearsOfExperience: number;
    education: IEducation[];
    certifications: string[];
}
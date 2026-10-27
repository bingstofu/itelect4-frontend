export interface Course {
  id?: string;
  code: string;
  title: string;
  units: number;
  semester?: string;
  description?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
}

export interface Submission {
  id: string;
  studentId: string;
  courseCode: string;
  title: string;
  content: string;
  repoUrl?: string;
  priority?: number;
  category?: string;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface AiReview {
  summary: string;
  strengths: string[];
  improvements: string[];
  readiness: 'ready' | 'almost' | 'not-yet';
}

export interface ApiSubmission {
  id: string;
  studentId: string;
  courseCode: string;
  repoUrl: string;
  submittedAt: string;
  score?: number;
}
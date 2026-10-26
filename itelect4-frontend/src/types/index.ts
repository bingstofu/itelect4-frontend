export interface Course {
  id?: string;
  code: string;
  title: string;
  units: number;
  semester: string;
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
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
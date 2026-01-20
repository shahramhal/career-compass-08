// User Types
export interface User {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  isEmailVerified: boolean;
  profile?: UserProfile;
}

export interface UserProfile {
  id: string;
  userId: string;
  phoneNumber?: string;
  location?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
  bio?: string;
  avatarUrl?: string;
}

// CV Types
export interface CV {
  id: string;
  userId: string;
  filename: string;
  fileUrl: string;
  parsedData: ParsedCVData | null;
  analysisData: AnalysisData | null;
  isPrimary: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ParsedCVData {
  personal?: {
    name?: string;
    email?: string;
    phone?: string;
    location?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
  summary?: string;
  experience?: Experience[];
  education?: Education[];
  skills?: string[];
  certifications?: Certification[];
  languages?: Language[];
  projects?: Project[];
}

export interface Experience {
  company?: string;
  title?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  current?: boolean;
  responsibilities?: string[];
  achievements?: string[];
}

export interface Education {
  institution?: string;
  degree?: string;
  field?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  gpa?: string;
  achievements?: string[];
}

export interface Certification {
  name?: string;
  issuer?: string;
  date?: string;
  credentialId?: string;
  url?: string;
}

export interface Language {
  name?: string;
  proficiency?: string;
}

export interface Project {
  name?: string;
  description?: string;
  technologies?: string[];
  url?: string;
  startDate?: string;
  endDate?: string;
}

export interface AnalysisData {
  atsScore?: number;
  recommendations?: string[];
  keywordMatches?: string[];
  missingKeywords?: string[];
}

// Auth Types
export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginData {
  email: string;
  password: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

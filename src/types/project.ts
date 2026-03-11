// src/types/project.ts
export interface Project {
  id: number;
  name: string;
  description: string;
  userId: number;       // autor
  userName?: string;
}
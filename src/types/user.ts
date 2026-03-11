// src/types/user.ts
export type UserRole = 'PONENTE' | 'EVALUADOR' | 'CHAIR' | 'ADMIN';

export interface User {
  id: number;
  name: string;
  lastName?: string;
  email: string;
  role: UserRole;
}
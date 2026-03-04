// src/types/user.ts
export type UserRole = 'PONENTE' | 'EVALUADOR' | 'CHAIR';

export interface User {
  id: number;
  nombre: string;
  correo: string;
  rol: UserRole;
}
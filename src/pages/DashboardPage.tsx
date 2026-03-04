// src/pages/DashboardPage.tsx
import { useEffect, useState } from 'react';
import { listUsers } from '../api/usersApi';
import { listProjects } from '../api/projectsApi';
import { listTasks } from '../api/tasksApi';
import { Task } from '../types/task';

export const DashboardPage = () => {
  const [totalUsuarios, setTotalUsuarios] = useState(0);
  const [totalProyectos, setTotalProyectos] = useState(0);
  const [totalTareas, setTotalTareas] = useState(0);
  const [pendientes, setPendientes] = useState(0);
  const [completadas, setCompletadas] = useState(0);

  useEffect(() => {
    const load = async () => {
      const [users, projects, tasks] = await Promise.all([
        listUsers(),
        listProjects(),
        listTasks(),
      ]);

      setTotalUsuarios(users.length);
      setTotalProyectos(projects.length);
      setTotalTareas(tasks.length);

      const pendientesCount = tasks.filter(
        (t: Task) => t.estado === 'PENDIENTE' || t.estado === 'EN_REVISION'
      ).length;
      const completadasCount = tasks.filter(
        (t: Task) => t.estado === 'ACEPTADO'
      ).length;

      setPendientes(pendientesCount);
      setCompletadas(completadasCount);
    };

    load();
  }, []);

  return (
    <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(3, 1fr)' }}>
      {/* Aquí usarías cards de MUI/Chakra, esto es solo base */}
      <div>Usuarios: {totalUsuarios}</div>
      <div>Proyectos: {totalProyectos}</div>
      <div>Tareas: {totalTareas}</div>
      <div>Tareas pendientes: {pendientes}</div>
      <div>Tareas completadas: {completadas}</div>
    </div>
  );
};
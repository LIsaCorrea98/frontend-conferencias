// src/pages/DashboardPage.tsx
import { useEffect, useState } from 'react';
import { listUsers } from '../api/usersApi';
import { listProjects } from '../api/projectsApi';
import { listTasks } from '../api/tasksApi';
import { Task } from '../types/task';
import { Layout } from '../components/layout/Layout';
import { Users, FolderKanban, CheckSquare, Clock, CheckCircle } from 'lucide-react';

export const DashboardPage = () => {
  const [totalUsuarios, setTotalUsuarios] = useState(0);
  const [totalProyectos, setTotalProyectos] = useState(0);
  const [totalTareas, setTotalTareas] = useState(0);
  const [pendientes, setPendientes] = useState(0);
  const [completadas, setCompletadas] = useState(0);

  useEffect(() => {
    const load = async () => {
      try {
        const [users, projects, tasks] = await Promise.all([
          listUsers(),
          listProjects(),
          listTasks(),
        ]);

        setTotalUsuarios(users.length);
        setTotalProyectos(projects.length);
        setTotalTareas(tasks.length);

        const pendientesCount = tasks.filter(
          (t: Task) => t.status === 'PENDIENTE' || t.status === 'EN_REVISION'
        ).length;
        const completadasCount = tasks.filter(
          (t: Task) => t.status === 'ACEPTADO'
        ).length;

        setPendientes(pendientesCount);
        setCompletadas(completadasCount);
      } catch (error) {
        console.error("Error loading dashboard data", error);
      }
    };

    load();
  }, []);

  return (
    <Layout
      title="Dashboard"
      description="Resumen general del sistema ETOMS y métricas principales."
    >
      <div className="grid-3" style={{ marginBottom: '2rem' }}>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ background: '#e0e7ff', color: 'var(--primary-color)', padding: '1rem', borderRadius: '50%' }}>
            <Users size={32} />
          </div>
          <div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 600 }}>Usuarios Totales</div>
            <div style={{ fontSize: '1.875rem', fontWeight: 700 }}>{totalUsuarios}</div>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ background: '#fce7f3', color: 'var(--secondary-color)', padding: '1rem', borderRadius: '50%' }}>
            <FolderKanban size={32} />
          </div>
          <div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 600 }}>Proyectos Activos</div>
            <div style={{ fontSize: '1.875rem', fontWeight: 700 }}>{totalProyectos}</div>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ background: '#e0f2fe', color: '#0ea5e9', padding: '1rem', borderRadius: '50%' }}>
            <CheckSquare size={32} />
          </div>
          <div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 600 }}>Tareas Totales</div>
            <div style={{ fontSize: '1.875rem', fontWeight: 700 }}>{totalTareas}</div>
          </div>
        </div>
      </div>

      <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Estado de Tareas</h2>
      <div className="grid-2">
        <div className="card" style={{ borderTop: '4px solid var(--warning-color)' }}>
          <div className="card-header" style={{ paddingBottom: '0.5rem', marginBottom: '1rem', border: 'none' }}>
            <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={20} color="var(--warning-color)" /> Pendientes / En Revisión
            </div>
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            {pendientes}
          </div>
        </div>

        <div className="card" style={{ borderTop: '4px solid var(--success-color)' }}>
          <div className="card-header" style={{ paddingBottom: '0.5rem', marginBottom: '1rem', border: 'none' }}>
            <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle size={20} color="var(--success-color)" /> Completadas (Aceptadas)
            </div>
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            {completadas}
          </div>
        </div>
      </div>
    </Layout>
  );
};
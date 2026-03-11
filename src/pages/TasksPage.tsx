// src/pages/TasksPage.tsx
import { useEffect, useState } from 'react';
import { listTasks, createTask, changeTaskStatus, listTasksByUser } from '../api/tasksApi';
import { listProjects } from '../api/projectsApi';
import { listUsers } from '../api/usersApi';
import { Task, TaskStatus } from '../types/task';
import { Project } from '../types/project';
import { User } from '../types/user';
import { Layout } from '../components/layout/Layout';
import { PlusCircle, FileText, Folder, User as UserIcon, HelpCircle, Filter } from 'lucide-react';

export const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [filterUser, setFilterUser] = useState<string>('');

  const [form, setForm] = useState<{
    title: string;
    projectId: string;
    userId: string;
    status: TaskStatus;
  }>({
    title: '',
    projectId: '',
    userId: '',
    status: 'PENDIENTE',
  });

  const loadData = async () => {
    try {
      const [projectsRes, usersRes] = await Promise.all([
        listProjects(),
        listUsers(),
      ]);
      setProjects(projectsRes || []);
      setUsers(usersRes || []);
    } catch (error) {
      console.error("Error cargando datos de la página de tareas", error);
      setProjects([]);
      setUsers([]);
    }
  };

  const loadTasks = async (userId: string) => {
    try {
      if (userId) {
        const userTasks = await listTasksByUser(Number(userId));
        setTasks(userTasks);
      } else {
        const allTasks = await listTasks();
        setTasks(allTasks);
      }
    } catch (error) {
      console.error("Error cargando tareas", error);
      setTasks([]);
    }
  }

  useEffect(() => {
    loadData();
    loadTasks('');
  }, []);

  useEffect(() => {
    loadTasks(filterUser);
  }, [filterUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.projectId || !form.userId || !form.title) return;

    try {
      await createTask({
        title: form.title,
        projectId: Number(form.projectId),
        userId: Number(form.userId),
        status: form.status,
      } as any);

      setForm({
        title: '',
        projectId: '',
        userId: '',
        status: 'PENDIENTE',
      });
      loadTasks(filterUser);
    } catch (error) {
      console.error("Error creando tarea", error);
    }
  };

  const handleChangeStatus = async (taskId: number, newStatus: TaskStatus) => {
    try {
      await changeTaskStatus(taskId, newStatus);
      loadTasks(filterUser);
    } catch (error) {
      console.error("Error cambiando estado de tarea", error);
    }
  };

  const getStatusBadge = (status: TaskStatus) => {
    switch (status) {
      case 'ACEPTADO': return 'badge-success';
      case 'EN_REVISION': return 'badge-warning';
      case 'RECHAZADO': return 'badge-danger';
      case 'PENDIENTE': return 'badge-primary';
      default: return 'badge-primary';
    }
  };

  return (
    <Layout
      title="Seguimiento de Tareas"
      description="Crea, asigna y actualiza el estado de las tareas de los proyectos."
    >
      <div className="grid-2" style={{ gridTemplateColumns: '1fr 2fr' }}>
        <section>
          <div className="card position-sticky" style={{ top: '90px' }}>
            <div className="card-header">
              <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <PlusCircle size={20} /> Nueva Tarea
              </h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Nombre de la Tarea</label>
                <div style={{ position: 'relative' }}>
                  <FileText size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                  <input
                    className="form-input"
                    style={{ paddingLeft: '2.75rem' }}
                    placeholder="Ej. Revisar documentación"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Proyecto Asociado</label>
                <div style={{ position: 'relative' }}>
                  <Folder size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                  <select
                    className="form-input"
                    style={{ paddingLeft: '2.75rem', appearance: 'none' }}
                    value={form.projectId}
                    onChange={(e) => setForm({ ...form, projectId: e.target.value })}
                    required
                  >
                    <option value="" disabled>Selecciona un proyecto</option>
                    {projects.map((p) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Asignar A</label>
                <div style={{ position: 'relative' }}>
                  <UserIcon size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                  <select
                    className="form-input"
                    style={{ paddingLeft: '2.75rem', appearance: 'none' }}
                    value={form.userId}
                    onChange={(e) => setForm({ ...form, userId: e.target.value })}
                    required
                  >
                    <option value="" disabled>Selecciona usuario responsable</option>
                    {users.map((u) => (
                      <option key={u.id} value={u.id}>{u.name} {u.lastName || ''}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Estado Inicial</label>
                <div style={{ position: 'relative' }}>
                  <HelpCircle size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                  <select
                    className="form-input"
                    style={{ paddingLeft: '2.75rem', appearance: 'none' }}
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value as TaskStatus })}
                    required
                  >
                    <option value="PENDIENTE">Pendiente</option>
                    <option value="EN_REVISION">En revisión</option>
                    <option value="ACEPTADO">Aceptado</option>
                    <option value="RECHAZADO">Rechazado</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                <PlusCircle size={18} /> Crear Tarea
              </button>
            </form>
          </div>
        </section>

        <section>
          <div className="card">
            <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 className="card-title">Listado de Tareas</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f8fafc', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <Filter size={16} color="var(--text-secondary)" />
                <select
                  style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '0.875rem', color: 'var(--text-secondary)' }}
                  value={filterUser}
                  onChange={(e) => setFilterUser(e.target.value)}
                >
                  <option value="">Todas las tareas</option>
                  {users.map(u => (
                    <option key={u.id} value={u.id}>Tareas de {u.name} {u.lastName || ''}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Tarea / Proyecto</th>
                    <th>Asignado A</th>
                    <th>Estado Actual</th>
                    <th style={{ textAlign: 'right' }}>Cambiar Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.length === 0 ? (
                    <tr>
                      <td colSpan={4} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                        No hay tareas registradas
                      </td>
                    </tr>
                  ) : (
                    tasks.map((t) => (
                      <tr key={t.id}>
                        <td>
                          <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{t.title}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <Folder size={12} />
                            {(() => {
                              const project = projects.find(p => p.id === t.projectId);
                              return project ? project.name : (t.projectName || `Proyecto #${t.projectId}`);
                            })()}
                          </div>
                        </td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            {(() => {
                              const user = users.find(u => u.id === t.userId);
                              const displayName = user
                                ? `${user.name} ${user.lastName || ''}`.trim()
                                : (t.userName || (t.userId ? `ID: ${t.userId}` : 'Sin Asignar'));
                              return (
                                <>
                                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 600, color: 'white' }}>
                                    {String(displayName).charAt(0).toUpperCase()}
                                  </div>
                                  <span style={{ fontSize: '0.9rem' }}>{displayName}</span>
                                </>
                              );
                            })()}
                          </div>
                        </td>
                        <td>
                          <span className={`badge ${getStatusBadge(t.status)}`}>
                            {t.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <select
                            className="form-input"
                            style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', width: 'auto', display: 'inline-block' }}
                            value={t.status}
                            onChange={(e) =>
                              handleChangeStatus(t.id, e.target.value as TaskStatus)
                            }
                          >
                            <option value="PENDIENTE">Pendiente</option>
                            <option value="EN_REVISION">En revisión</option>
                            <option value="ACEPTADO">Aceptado</option>
                            <option value="RECHAZADO">Rechazado</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};
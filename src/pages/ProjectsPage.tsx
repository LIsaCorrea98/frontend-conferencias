// src/pages/ProjectsPage.tsx
import { useEffect, useState } from 'react';
import { listProjects, createProject } from '../api/projectsApi';
import { Project } from '../types/project';
import { listUsers } from '../api/usersApi';
import { User } from '../types/user';
import { Layout } from '../components/layout/Layout';
import { FolderPlus, FileText, User as UserIcon } from 'lucide-react';

export const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState<{
    name: string;
    description: string;
    userId: string;
  }>({
    name: '',
    description: '',
    userId: '',
  });

  const loadData = async () => {
    try {
      const [projectsRes, usersRes] = await Promise.all([
        listProjects(),
        listUsers(),
      ]);
      setProjects(projectsRes);
      setUsers(usersRes);
    } catch (error) {
      console.error("Error cargando proyectos o usuarios", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.userId || !form.name) return;

    try {
      await createProject({
        name: form.name,
        description: form.description,
        userId: Number(form.userId),
      } as any);

      setForm({ name: '', description: '', userId: '' });
      loadData();
    } catch (error) {
      console.error("Error creando proyecto", error);
    }
  };

  return (
    <Layout
      title="Proyectos"
      description="Crea nuevos proyectos y asígnales un líder o autor responsable."
    >
      <div className="grid-2" style={{ gridTemplateColumns: '1fr 2fr' }}>
        <section>
          <div className="card position-sticky" style={{ top: '90px' }}>
            <div className="card-header">
              <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FolderPlus size={20} /> Nuevo Proyecto
              </h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Título del Proyecto</label>
                <div style={{ position: 'relative' }}>
                  <FileText size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                  <input
                    className="form-input"
                    style={{ paddingLeft: '2.75rem' }}
                    placeholder="Ej. Rediseño de Plataforma"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Descripción</label>
                <textarea
                  className="form-input"
                  style={{ minHeight: '100px', resize: 'vertical' }}
                  placeholder="Describe brevemente el objetivo de este proyecto..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Autor Responsable</label>
                <div style={{ position: 'relative' }}>
                  <UserIcon size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                  <select
                    className="form-input"
                    style={{ paddingLeft: '2.75rem', appearance: 'none' }}
                    value={form.userId}
                    onChange={(e) => setForm({ ...form, userId: e.target.value })}
                    required
                  >
                    <option value="" disabled>Selecciona un usuario</option>
                    {users.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name} {u.lastName || ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                <FolderPlus size={18} /> Crear Proyecto
              </button>
            </form>
          </div>
        </section>

        <section>
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Listado de Proyectos</h2>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Descripción</th>
                    <th>Autor/Líder</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.length === 0 ? (
                    <tr>
                      <td colSpan={3} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                        No hay proyectos registrados
                      </td>
                    </tr>
                  ) : (
                    projects.map((p) => (
                      <tr key={p.id}>
                        <td style={{ fontWeight: 600, color: 'var(--primary-color)' }}>{p.name}</td>
                        <td style={{ color: 'var(--text-secondary)', maxWidth: '300px' }}>
                          <p style={{ margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {p.description}
                          </p>
                        </td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            {(() => {
                              const user = users.find(u => u.id === p.userId);
                              const displayName = user
                                ? `${user.name} ${user.lastName || ''}`.trim()
                                : (p.userName || (p.userId ? `ID: ${p.userId}` : 'Sin Asignar'));
                              return (
                                <>
                                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                                    {String(displayName).charAt(0).toUpperCase()}
                                  </div>
                                  <span>{displayName}</span>
                                </>
                              );
                            })()}
                          </div>
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
// src/components/layout/Sidebar.tsx
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, FolderKanban, CheckSquare, Settings } from 'lucide-react';

export const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <Home size={20} /> },
    { name: 'Usuarios', path: '/usuarios', icon: <Users size={20} /> },
    { name: 'Proyectos', path: '/proyectos', icon: <FolderKanban size={20} /> },
    { name: 'Tareas', path: '/tareas', icon: <CheckSquare size={20} /> },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div style={{ background: 'var(--primary-color)', color: 'white', padding: '0.5rem', borderRadius: 'var(--radius-md)' }}>
          <FolderKanban size={24} />
        </div>
        ETOMS
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path ||
            (item.path !== '/' && location.pathname.startsWith(item.path));
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              {item.icon}
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
        <a href="#" className="nav-item">
          <Settings size={20} />
          Configuración
        </a>
      </div>
    </aside>
  );
};
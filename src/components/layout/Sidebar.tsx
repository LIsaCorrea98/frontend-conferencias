import { NavLink } from 'react-router-dom';

const linkStyle: React.CSSProperties = {
  display: 'block',
  padding: '0.75rem 1rem',
  color: '#e5e7eb',
  textDecoration: 'none',
  fontSize: '0.95rem',
  borderRadius: '0.375rem',
};

const activeStyle: React.CSSProperties = {
  backgroundColor: '#1f2937',
  color: '#ffffff',
};

export const Sidebar = () => {
  return (
    <aside
      style={{
        width: '240px',
        background: '#111827',
        color: '#e5e7eb',
        padding: '1.5rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
      }}
    >
      <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Conferencia</div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <NavLink
          to="/dashboard"
          style={({ isActive }) => ({
            ...linkStyle,
            ...(isActive ? activeStyle : {}),
          })}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/usuarios"
          style={({ isActive }) => ({
            ...linkStyle,
            ...(isActive ? activeStyle : {}),
          })}
        >
          Usuarios
        </NavLink>
        <NavLink
          to="/proyectos"
          style={({ isActive }) => ({
            ...linkStyle,
            ...(isActive ? activeStyle : {}),
          })}
        >
          Proyectos
        </NavLink>
        <NavLink
          to="/tareas"
          style={({ isActive }) => ({
            ...linkStyle,
            ...(isActive ? activeStyle : {}),
          })}
        >
          Tareas
        </NavLink>
      </nav>
    </aside>
  );
};
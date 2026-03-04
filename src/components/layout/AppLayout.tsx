// src/components/layout/AppLayout.tsx
import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

interface Props {
  children: ReactNode;
}

export const AppLayout = ({ children }: Props) => (
  <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f5f5' }}>
    <Sidebar />
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Topbar />
      <main style={{ padding: '1.5rem' }}>{children}</main>
    </div>
  </div>
);
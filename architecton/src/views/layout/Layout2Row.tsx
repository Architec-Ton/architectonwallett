import { ReactNode } from 'react';
import './Layout.styles.css';
import Layout from './Layout';

type Props = {
  children: ReactNode;
};

function Layout2Row({ children }: Props) {
  return (
    <Layout
      style={{
        maxWidth: '475px',
        justifyContent: 'space-between',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}>
      {children}
    </Layout>
  );
}

export default Layout2Row;
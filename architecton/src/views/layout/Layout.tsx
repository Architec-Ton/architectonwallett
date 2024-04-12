import { ReactNode } from 'react';

import classNames from 'classnames';
import Header from '../header/Header';

import './Layout.styles.css';

type Props = {
  children: ReactNode;
};

function Layout({ children }: Props) {
  return (
    <>
      <div className={classNames('layout')}>
        <Header />
        <main>{children}</main>
      </div>
    </>
  );
}

export default Layout;

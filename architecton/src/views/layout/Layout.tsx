import { ReactNode } from 'react';

import classNames from 'classnames';
import Header from '../header/Header';

import './Layout.styles.css';
import { CSSProperties } from '@linaria/core';

type Props = {
  children: ReactNode;
  style?: CSSProperties;
};

function Layout({ children, style }: Props) {
  return (
    <>
      <div className={classNames('layout')} style={style}>
        <Header />
        {children}
      </div>
    </>
  );
}

export default Layout;

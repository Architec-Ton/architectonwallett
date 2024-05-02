import { ReactNode, useEffect } from 'react';

import classNames from 'classnames';

import './Layout.styles.css';
import { CSSProperties } from '@linaria/core';
import Header from '../header/Header';
import { useMiniApp } from '@tma.js/sdk-react';

// import { useMiniApp } from '@tma.js/sdk-react';

type Props = {
  children: ReactNode;
  style?: CSSProperties;
};

function Layout({ children, style }: Props) {
  const miniapp = useMiniApp();

  useEffect(() => {
    miniapp.ready();
  }, []);

  return (
    <>
      <div className={classNames('layout')} style={style}>
        <Header />
        {children}
      </div>
    </>
  ); /*<Header />*/
}

export default Layout;

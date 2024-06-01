import { ReactNode, useEffect } from 'react';

import classNames from 'classnames';

import './Layout2.styles.css';
import { CSSProperties } from '@linaria/core';
// import Header from '../header/Header';
// import { useMiniApp } from '@tma.js/sdk-react';

// import { useMiniApp } from '@tma.js/sdk-react';

type Props = {
  children: ReactNode;
  style?: CSSProperties;
};

function Layout2({ children, style }: Props) {
  // const miniapp = useMiniApp();

  useEffect(() => {
    //miniapp.ready();
  }, []);

  return (
    <>
      <div className={classNames('layout2')} style={style}>
        {/* <Header /> */}
        {children}
      </div>
    </>
  ); /*<Header />*/
}

export default Layout2;

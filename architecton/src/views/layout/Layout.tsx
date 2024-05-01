import { ReactNode } from 'react';

import classNames from 'classnames';
//import Header from '../header/Header';

import './Layout.styles.css';
import { CSSProperties } from '@linaria/core';

// import { useMiniApp } from '@tma.js/sdk-react';

type Props = {
  children: ReactNode;
  style?: CSSProperties;
};

function Layout({ children, style }: Props) {
  // const miniapp = useMiniApp({
  //   expand: true,
  // });

  return (
    <>
      <div className={classNames('layout')} style={style}>
        {children}
      </div>
    </>
  ); /*<Header />*/
}

export default Layout;

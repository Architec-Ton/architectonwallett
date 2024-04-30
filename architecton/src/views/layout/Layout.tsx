import { ReactNode } from 'react';

import classNames from 'classnames';
import Header from '../header/Header';

import './Layout.styles.css';
import { CSSProperties } from '@linaria/core';
import { SWRConfig } from 'swr';

type Props = {
  children: ReactNode;
  style?: CSSProperties;
};

function Layout({ children, style }: Props) {
  return (
    <>
      <SWRConfig
        value={{
          refreshInterval: 3000,
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
        }}>
        <div className={classNames('layout')} style={style}>
          <Header />
          {children}
        </div>
      </SWRConfig>
    </>
  );
}

export default Layout;

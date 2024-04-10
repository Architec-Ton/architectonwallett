import { ReactNode } from 'react';
import styles from './Layout.styles';
import classNames from 'classnames';
import Header from '../header/Header';

type Props = {
  children: ReactNode;
};

function Layout({ children }: Props) {
  return (
    <>
      <div className={classNames(styles.Layout)}>
        <Header title="Architec.TON" />
        <main>{children}</main>
        <div className="text-primary"> aa dd</div>
        <div className="text-secondary"> aaa fff</div>
        <button className={classNames('btn', 'btn-primary')}>Open</button>
      </div>
    </>
  );
}

export default Layout;

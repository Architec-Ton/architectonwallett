import { ReactNode } from 'react';

import classNames from 'classnames';
import Loader from './Loader';

type Props = {
  children: ReactNode;
  className?: string;
  isLoading: boolean;
  loadingTitle: string;
};

function Container({ children, className, isLoading, loadingTitle }: Props) {
  return (
    <div
      className={classNames('container', className)}
      style={{ padding: 'var(--layout-padding)' }}>
      {!isLoading && children}
      {isLoading && <Loader title={loadingTitle} />}
    </div>
  );
}

Container.defaultProps = {
  isLoading: false,
  loadingTitle: null,
};

export default Container;

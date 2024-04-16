import { ReactNode } from 'react';

import classNames from 'classnames';

type Props = {
  children: ReactNode;
  className?: string;
};

function Container({ children, className }: Props) {
  return (
    <div
      className={classNames('container', className)}
      style={{ padding: 'var(--layout-padding)' }}>
      {children}
    </div>
  );
}

export default Container;

import classNames from 'classnames';
import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

function Footer({ children }: Props) {
  return (
    <div
      className={classNames({
        footer: true,
        'footer-shift': !children,
      })}>
      <div>
        <p>
          Our <a href="#">Support Team</a>
        </p>
        <p>in Telegram</p>
      </div>
      {children}
    </div>
  );
}

export default Footer;

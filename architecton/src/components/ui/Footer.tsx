import { useUtils } from '@tma.js/sdk-react';
import classNames from 'classnames';
import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

function Footer({ children }: Props) {
  const utils = useUtils();

  const clickSupport = () => {
    utils.openTelegramLink('https://t.me/architec_ton_ru');
  };
  return (
    <div
      className={classNames({
        footer: true,
        'footer-shift': !children,
      })}>
      <div>
        <p>
          Our{' '}
          <a href="#" onClick={clickSupport}>
            Support Team
          </a>
        </p>
        <p>in Telegram</p>
      </div>
      {children}
    </div>
  );
}

export default Footer;

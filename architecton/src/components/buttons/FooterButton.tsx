import { MouseEventHandler } from 'react';
import './FooterButton.styles.css';

type Props = {
  title: string;
  disabled?: boolean;
  onClick?: MouseEventHandler;
};

function FooterButton({ title, onClick, disabled }: Props) {
  return (
    <button onClick={onClick} className="footerbutton" disabled={disabled}>
      {title}
    </button>
  );
}

export default FooterButton;

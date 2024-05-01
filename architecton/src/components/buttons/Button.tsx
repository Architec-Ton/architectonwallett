import { MouseEventHandler } from 'react';
import './Button.styles.css';

type Props = {
  title: string;
  icon: string;
  onClick?: MouseEventHandler;
  disabled?: boolean;
};

function Button({ title, icon, onClick, disabled }: Props) {
  return (
    <button onClick={onClick} disabled={disabled} className="mainbutton">
      <img src={icon} alt={title} /> {title}
    </button>
  );
}

export default Button;

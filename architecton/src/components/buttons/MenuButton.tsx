import { MouseEventHandler } from 'react';
import './MenuButton.styles.css';

type Props = {
  title: string;
  icon: string;
  onClick?: MouseEventHandler;
};

function MenuButton({ title, icon, onClick }: Props) {
  return (
    <div className="menubutton">
      <button onClick={onClick}>
        <img src={icon} alt={title} />
      </button>
      <div>{title}</div>
    </div>
  );
}

export default MenuButton;

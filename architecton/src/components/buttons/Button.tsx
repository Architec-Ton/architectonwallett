import { MouseEventHandler } from 'react';
import './Button.styles.css';
import React from 'react';

type Props = {
  title: string;
  icon: string;
  onClick?: MouseEventHandler;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties | undefined;
};

function Button({ title, icon, onClick, disabled, style }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="mainbutton"
      style={style}>
      <img src={icon} alt={title} /> {title}
    </button>
  );
}

export default Button;

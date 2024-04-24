import classNames from 'classnames';
import './Input.styles.css';
import { ChangeEventHandler } from 'react';

type Props = {
  prefix?: string;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLElement>;
};

function Input({ prefix, placeholder, onChange }: Props) {
  return (
    <div
      className={classNames({
        'base-input': true,
        'prefix-input': !!prefix,
      })}>
      <span>{prefix}</span>
      <input placeholder={placeholder} onChange={onChange} />
    </div>
  );
}

export default Input;

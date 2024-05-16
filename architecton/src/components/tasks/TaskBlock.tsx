import classNames from 'classnames';
import './TasksBlock.styles.css';
import { useTranslation } from 'react-i18next';
import { MouseEventHandler, ReactNode } from 'react';

type Props = {
  title?: string;
  btnTitle?: string;
  btnIcon?: string;
  btnDisabled: boolean;
  children?: ReactNode;
  onClick?: MouseEventHandler;
};

function TasksBlock({
  title,
  btnTitle,
  btnIcon,
  children,
  btnDisabled,
  onClick,
}: Props) {
  const { t } = useTranslation();
  return (
    <div
      className={classNames({
        'selected-block': true,
        'square-block': true,
        workspace: true,
      })}
      style={{
        justifyContent: 'space-between',
        padding: '1rem 0 0 0',
      }}>
      <h3
        style={{
          padding: '0 1rem',
        }}>
        {t(title)}
      </h3>

      <div className="bank-content">{children}</div>

      <div className="tasks-banks">
        <button
          onClick={onClick}
          className="workspace-banks-icon tasks-btn"
          disabled={btnDisabled}>
          <span>{btnTitle}</span>
          {btnIcon && <img src={btnIcon} style={{ width: '20px' }} />}
        </button>
      </div>
    </div>
  );
}

TasksBlock.defaultProps = {
  title: 'task_first',
  btnDisabled: false,
};

export default TasksBlock;

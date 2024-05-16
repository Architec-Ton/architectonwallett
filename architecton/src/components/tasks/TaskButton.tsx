import './TaskButton.style.css';
import { useTranslation } from 'react-i18next';
import { MouseEventHandler, ReactNode } from 'react';
import assets from '../../assets';

type Props = {
  title?: string;
  subTitle?: string;
  icon?: string;
  iconState?: string;
  children?: ReactNode;
  onClick?: MouseEventHandler;
};

function TaskButton({
  title,
  subTitle,
  icon,
  children,
  iconState,
  onClick,
}: Props) {
  const { t } = useTranslation();
  return (
    <div className="task-button" onClick={onClick}>
      <div className="task-button-left">
        {icon && <img src={icon} className="task-button-icon" />}
        <div className="task-button-content">
          <h3>{title}</h3>
          <p>{subTitle}</p>
        </div>
      </div>
      <img
        src={iconState}
        style={{
          justifySelf: 'end',
        }}
      />
    </div>
  );
}

TaskButton.defaultProps = {
  title: 'task_first',
};

export default TaskButton;

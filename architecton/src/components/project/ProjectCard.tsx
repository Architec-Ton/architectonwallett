import cn from 'classnames';
import './ProjectCard.styles.css';
import { useNavigate } from 'react-router-dom';

type Props = {
  title: string;
  icon: string;
  description: string;
  url: string;
};

function ProjectCard({ title, icon, description, url }: Props) {
  const navigate = useNavigate();

  return (
    <div className="project-card">
      <div className="project-card-title">
        <img src={icon} alt={title} />
        <div>
          <div>{title}</div>
          <div className="project-card-title-amount">{description}</div>
        </div>
      </div>
      <div className="project-card-open">
        <button
          className={cn('btn', 'btn-primary')}
          onClick={() => navigate(url)}>
          Open
        </button>
      </div>
    </div>
  );
}

export default ProjectCard;

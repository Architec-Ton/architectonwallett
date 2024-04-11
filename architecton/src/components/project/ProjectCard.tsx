import cn from 'classnames';
import './ProjectCard.styles.css';

type Props = {
  title: string;
  icon: string;
  description: string;
};

function ProjectCard({ title, icon, description }: Props) {
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
        <button className={cn('btn', 'btn-primary')}>Open</button>
      </div>
    </div>
  );
}

export default ProjectCard;

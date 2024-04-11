import cn from 'classnames';
import './ProjectDetails.styles.css';

type Props = {
  title: string;
  icon: string;
  description: string;
};

function ProjectDetail({ title, icon, description }: Props) {
  return (
    <div className="project-detail">
      <img src={icon} alt={title} />
      <div className="project-detail-title">
        <div>{title}</div>
        <div className="project-detail-description">{description}</div>
        <button className={cn('btn', 'btn-primary')}>Play</button>
      </div>
    </div>
  );
}

export default ProjectDetail;

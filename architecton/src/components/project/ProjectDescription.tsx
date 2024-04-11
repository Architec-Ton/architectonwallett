import BlockHeader from '../ui/BlockHeader';
import './ProjectDetails.styles.css';

type Props = {
  description: string;
};

function ProjectDescription({ description }: Props) {
  return (
    <div className="project-description">
      <BlockHeader title="Description" />
      <div>{description}</div>
    </div>
  );
}

export default ProjectDescription;

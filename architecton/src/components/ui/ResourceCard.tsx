import './ResourceCard.styles.css';

type Props = {
  title: string;
  icon: string;
  description: string;
};

function ResourceCard({ title, icon, description }: Props) {
  return (
    <div className="resource-card">
      <div className="resource-card-title">
        <img src={icon} alt={title} />
        <div>
          <div>{title}</div>
          <div className="resource-card-title-amount">{description}</div>
        </div>
      </div>
      <div className="resource-card-open"></div>
    </div>
  );
}

export default ResourceCard;

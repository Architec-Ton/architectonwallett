import './MenuButton.styles.css';

type Props = {
  title: string;
  icon: string;
};

function MenuButton({ title, icon }: Props) {
  return (
    <div className="menubutton">
      <button>
        <img src={icon} alt={title} />
      </button>
      <div>{title}</div>
    </div>
  );
}

export default MenuButton;

import assets from '../../assets';
import './SelectButton.styles.css';
import classNames from 'classnames';

type Props = {
  icon: string;
  title: string;
  description: string;
  selected: boolean;
  onClick?: (selected: boolean) => void;
};

function SelectButton({ icon, title, description, selected, onClick }: Props) {
  return (
    <div
      className={classNames({
        selectbutton: true,
        selected: selected,
      })}
      onClick={() => {
        console.log(selected);
        onClick && onClick(!selected);
      }}>
      <img src={icon} />
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <img src={assets.iconArray} />
    </div>
  );
}

export default SelectButton;

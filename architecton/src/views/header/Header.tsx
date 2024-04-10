import classNames from 'classnames';
import './Header.styles.css';
import Dropdown from '../../components/menu/Dropdown';

type Props = {
  title: string;
};

function Header({ title }: Props) {
  return (
    <header className={classNames('header')}>
      <h1>{title}</h1>
      <Dropdown />
    </header>
  );
}

export default Header;

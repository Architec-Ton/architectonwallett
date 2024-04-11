import classNames from 'classnames';
import './Header.styles.css';
import Dropdown from '../../components/menu/Dropdown';
import assets from '../../assets';
import { useLocation, useNavigate } from 'react-router-dom';

type Props = {
  title: string;
};

function Header({ title }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <header className={classNames('header')}>
      <div style={{ display: 'flex' }}>
        {location.pathname != '/' ? (
          <img
            src={assets.iconBack}
            onClick={() => navigate(-1)}
            style={{ marginRight: '1rem' }}
          />
        ) : (
          ''
        )}
        <h1>{title}</h1>
      </div>
      <Dropdown />
    </header>
  );
}

export default Header;

import { useLocation, useNavigate } from 'react-router-dom';
//import { useBackButton } from '@tma.js/sdk-react';
//import { useEffect } from 'react';
import assets from '../../assets';
import classNames from 'classnames';
import Dropdown from '../../components/menu/Dropdown';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  if (import.meta.env.VITE_ENABLE_MINIAPP) {
    // const backButton = useBackButton();
    // useEffect(() => {
    //   if (location.pathname == '/') {
    //     backButton.hide();
    //   } else {
    //     backButton.on('click', () => {
    //       console.log('cliiiiiiik');
    //       navigate(-1);
    //     });
    //     backButton.show();
    //   }
    // });
    return <></>;
  } else {
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
          <h1>ARCHITECTON</h1>
        </div>
        <Dropdown />
      </header>
    );
  }
}

export default Header;

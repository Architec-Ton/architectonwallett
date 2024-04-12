import { useLocation, useNavigate } from 'react-router-dom';
import { useBackButton } from '@tma.js/sdk-react';
import { useEffect } from 'react';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const backButton = useBackButton();
  useEffect(() => {
    if (location.pathname == '/') {
      backButton.hide();
    } else {
      backButton.on('click', () => {
        console.log('cliiiiiiik');
        navigate(-1);
      });
      backButton.show();
    }
  });

  return <></>;
  // return (
  //   <header className={classNames('header')}>
  //     <div style={{ display: 'flex' }}>
  //       {location.pathname != '/' ? (
  //         <img
  //           src={assets.iconBack}
  //           onClick={() => navigate(-1)}
  //           style={{ marginRight: '1rem' }}
  //         />
  //       ) : (
  //         ''
  //       )}
  //       <h1>{title}</h1>
  //     </div>
  //     <Dropdown />
  //   </header>
  // );
}

export default Header;

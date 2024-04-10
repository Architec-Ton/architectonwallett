import MenuButton from '../../components/buttons/MenuButton';

import assets from '../../assets';

import './MainMenu.styles.css';

function MainMenu() {
  return (
    <div className="mainmenu">
      <MenuButton title="Receive" icon={assets.iconReceive}></MenuButton>
      <MenuButton title="Send" icon={assets.iconSend}></MenuButton>
      <MenuButton title="Swap" icon={assets.iconSwap}></MenuButton>
      <MenuButton title="Bank" icon={assets.iconBank}></MenuButton>
      <MenuButton title="Buy" icon={assets.iconBuy}></MenuButton>
    </div>
  );
}

export default MainMenu;

import { useState } from 'react';
import './ProjectsMenu.styles.css';
import cn from 'classnames';

function ProjectsMenu() {
  const menuList = ['Tokens', 'Mini Games', 'Websites', 'Channels'];

  const [currentMenu, setCurrentMenu] = useState<string>(menuList[0]);

  return (
    <div className="projectmenu">
      {menuList.map((menuName) => (
        <a
          key={menuName}
          href={`#${menuName}`}
          onClick={() => setCurrentMenu(menuName)}
          className={cn(currentMenu == menuName ? 'active' : '')}>
          {menuName}
        </a>
      ))}
    </div>
  );
}

export default ProjectsMenu;

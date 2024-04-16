import { IToken } from '../../types/token';
import ProjectsMenu from '../menu/ProjectsMenu';
import ProjectList from './ProjectList';

interface Props {
  tokens: IToken[];
}

function Projects({ tokens }: Props) {
  //   const onMenuChange = (menuName: string) => {
  //     console.log(`Menu changed: ${menuName}`);
  //   };

  return (
    <div className="projects">
      <ProjectsMenu />
      <ProjectList tokens={tokens} />
    </div>
  );
}

export default Projects;

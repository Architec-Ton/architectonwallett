import ProjectsMenu from '../menu/ProjectsMenu';
import ProjectList from './ProjectList';

function Projects() {
  const onMenuChange = (menuName: string) => {
    console.log(`Menu changed: ${menuName}`);
  };

  return (
    <div className="projects">
      <ProjectsMenu />
      <ProjectList />
    </div>
  );
}

export default Projects;

import assets from '../../assets';
import { BASE_URL } from '../../constants';
import { IToken } from '../../types/token';
import ProjectCard from './ProjectCard';

interface Props {
  tokens: IToken[];
}

function ProjectList({ tokens }: Props) {
  //   const onMenuChange = (menuName) => {
  //     console.log(`Menu changed: ${menuName}`);
  //   };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: '1.5rem',
      }}>
      {/* {tokens.map((i) => (
        <ProjectCard
          title={i.name}
          icon={i.image}
          description={i.description}
        />
      ))} */}

      <ProjectCard
        title="Punk City"
        icon={assets.imagePunk}
        description="$PUNK Game"
        url={`${BASE_URL}/project/punk`}
      />

      <ProjectCard
        title="Add own game"
        icon={assets.iconExist}
        description="You are founder the game"
        url={`${BASE_URL}/settings/application-submit`}
      />
    </div>
  );
}

export default ProjectList;

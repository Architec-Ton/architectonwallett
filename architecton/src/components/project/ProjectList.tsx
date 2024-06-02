import assets from '../../assets';
import { BASE_URL } from '../../constants';
import { IToken } from '../../types/token';
import ProjectCard from './ProjectCard';

interface Props {
  tokens: IToken[];
}

interface IProjectItems {
  url: string;
  icon: string;
  title: string;
  description: string;
}

const projectItems: Array[IProjectItems] = [
  {
    url: `${BASE_URL}/project/punk`,
    icon: assets.imagePunk,
    title: 'PUNK',
    description: 'Body PUMP',
  },
  {
    url: `${BASE_URL}/apps`,
    icon: `${BASE_URL}/images/bodypump.jpg`,
    title: 'Body PUMP',
    description: 'Body PUMP',
  },
  {
    url: `${BASE_URL}/apps`,
    icon: `${BASE_URL}/images/edchess.jpg`,
    title: 'EdChess',
    description: 'EdChess',
  },
  {
    url: `${BASE_URL}/apps`,
    icon: `${BASE_URL}/images/goldgoblin.jpg`,
    title: 'Gold Goblins',
    description: 'Gold Goblins',
  },
];

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
      {projectItems.map((p) => (
        <ProjectCard {...p} />
      ))}

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

import assets from '../../assets';
import ProjectCard from './ProjectCard';

function ProjectList() {
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
      <ProjectCard
        title="Punk City"
        icon={assets.imagePunk}
        description="$PUNK Game"
      />
      <ProjectCard
        title="Toncoin"
        icon={assets.coinToncoin}
        description={'3424324'}
      />
      <ProjectCard
        title="Toncoin"
        icon={assets.coinToncoin}
        description={'3424324'}
      />
      <ProjectCard
        title="Toncoin"
        icon={assets.coinToncoin}
        description={'3424324'}
      />
    </div>
  );
}

export default ProjectList;

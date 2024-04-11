import Layout from '../layout/Layout';
import ProjectDetail from '../../components/project/ProjectDetail';
import assets from '../../assets';
import ProjectGallery from '../../components/project/ProjectGallery';
import ProjectDescription from '../../components/project/ProjectDescription';
import ResourceList from '../../components/ui/ResourceList';

function Project() {
  return (
    <Layout>
      <ProjectDetail
        title="Punk City"
        icon={assets.imagePunk}
        description="$PUNK GameFi ecosystem. Runs on The Open Network"
      />
      <ProjectGallery />
      <ProjectDescription
        description={`Punk City introduces players to the CyberArena
            for intense PvP battles. With options for friendly
            duels or token-based confrontations, it features
            an advanced inventory system and a competitive weekly League. Beyond combat, the app offers daily token giveaways through tasks.`}
      />
      <ResourceList />
    </Layout>
  );
}

export default Project;

import assets from '../../assets';
import ResourceCard from './ResourceCard';

function ResourceList() {
  //   const onMenuChange = (menuName) => {
  //     console.log(`Menu changed: ${menuName}`);
  //   };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: '1.5rem',
        padding: 'var(--layout-padding)',
      }}>
      <ResourceCard
        title="TON Punk"
        icon={assets.imagePunk}
        description="Official Telegram Channel"
      />
      <ResourceCard
        title="$PUNK"
        icon={assets.coinToncoin}
        description="Project token"
      />
    </div>
  );
}

export default ResourceList;

import Layout from '../layout/Layout';
import assets from '../../assets';
import CoinCard from '../../components/coin/CoinCard';
import MainMenu from '../../components/menu/MainMenu';
import BlockHeader from '../../components/ui/BlockHeader';
import { useParams } from 'react-router-dom';
import ResourceList from '../../components/ui/ResourceList';

function Coin() {
  const { coinId } = useParams();

  return (
    <Layout>
      <div style={{ padding: 'var(--layout-padding)' }}>
        <CoinCard
          title={coinId ? coinId : 'Undefined'}
          icon={assets.coinToncoin}
          amount={'--'}
          amountUsd={232}
          changes={12.3}
        />
      </div>
      <MainMenu />
      <div style={{ padding: 'var(--layout-padding)' }}>
        <BlockHeader title="Project resources" />
      </div>
      <ResourceList />
    </Layout>
  );
}

export default Coin;

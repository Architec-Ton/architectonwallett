import Layout from '../layout/Layout';
import Balance from '../../components/balance/Balance';
import MainMenu from '../../components/menu/MainMenu';
import CoinList from '../../components/coin/CoinList';
import Projects from '../../components/project/Projects';

function Main() {
  return (
    <Layout>
      <Balance title="$152 234,17"></Balance>
      <MainMenu />
      <CoinList />
      <Projects />
    </Layout>
  );
}

export default Main;

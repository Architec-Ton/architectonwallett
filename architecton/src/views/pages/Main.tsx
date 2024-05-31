import Balance from '../../components/balance/Balance';
import MainMenu from '../../components/menu/MainMenu';
import CoinList from '../../components/coin/CoinList';
import Projects from '../../components/project/Projects';
import useSWR from 'swr';
import Layout2 from '../layout/Layout2';

function Main() {
  // created function to handle API request
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  //const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, error, isLoading } = useSWR(
    `http://127.0.0.1:8000/api/v1/info/test`,
    fetcher
  );

  //navigate('/welcome');

  console.log(data, isLoading, error);

  // if (error) return <div className="failed">failed to load</div>;
  // if (isLoading) return <div className="Loading">Loading...</div>;

  return (
    <Layout2>
      <Balance title="$152 234,17"></Balance>
      <MainMenu />
      <CoinList />
      <Projects tokens={data ? data.games : []} />
    </Layout2>
  );

  // //{!isLoading && <Projects tokens={data.tokens} />}
}

export default Main;

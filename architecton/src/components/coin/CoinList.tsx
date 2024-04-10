import assets from '../../assets';
import CoinCard from '../../components/coin/CoinCard';

function CoinList() {
  return (
    <div
      style={{
        padding: '2rem 0rem',
        display: 'flex',
        flexDirection: 'column',
        rowGap: '1rem',
      }}>
      <CoinCard title="Toncoin" icon={assets.coinToncoin} amount={3424324} />
      <CoinCard title="USDT" icon={assets.coinToncoin} amount={32} />
      <CoinCard title="Toncoin" icon={assets.coinToncoin} amount={332} />
    </div>
  );
}

export default CoinList;

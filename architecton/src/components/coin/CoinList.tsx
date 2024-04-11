import assets from '../../assets';
import CoinCard from '../../components/coin/CoinCard';

function CoinList() {
  return (
    <div className="coins">
      <CoinCard title="Toncoin" icon={assets.coinToncoin} amount={3424324} />
      <CoinCard title="USDT" icon={assets.coinToncoin} amount={32} />
      <CoinCard title="Toncoin" icon={assets.coinToncoin} amount={332} />
    </div>
  );
}

export default CoinList;

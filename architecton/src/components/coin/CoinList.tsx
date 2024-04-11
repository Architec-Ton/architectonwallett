import assets from '../../assets';
import CoinCard from '../../components/coin/CoinCard';

function CoinList() {
  return (
    <div className="coins">
      <CoinCard
        title="Toncoin"
        icon={assets.coinToncoin}
        amount={3424324}
        amountUsd={232}
        changes={12.3}
      />
      <CoinCard
        title="USDT"
        icon={assets.coinUSDT}
        amount={32}
        amountUsd={232}
        changes={12.3}
      />
      <CoinCard
        title="My Assets"
        icon={assets.coinAssets}
        amount={332}
        amountUsd={232}
        changes={12.3}
      />
    </div>
  );
}

export default CoinList;

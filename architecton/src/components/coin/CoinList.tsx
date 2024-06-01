import assets from '../../assets';
import CoinCard from '../../components/coin/CoinCard';

type Props = {
  tonAmount: string;
};

function CoinList({ tonAmount }: Props) {
  return (
    <div className="coins">
      <CoinCard
        title="Toncoin"
        icon={assets.coinToncoin}
        amount={tonAmount}
        amountUsd={232}
        changes={12.3}
      />
      <CoinCard
        title="USDT"
        icon={assets.coinUSDT}
        amount={'--'}
        amountUsd={232}
        changes={12.3}
      />
      <CoinCard
        title="My Assets"
        icon={assets.coinAssets}
        amount={'--'}
        amountUsd={232}
        changes={12.3}
      />
    </div>
  );
}

export default CoinList;

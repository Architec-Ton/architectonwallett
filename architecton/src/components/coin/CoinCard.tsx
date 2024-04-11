import { useNavigate } from 'react-router-dom';
import './CoinCard.styles.css';

type Props = {
  title: string;
  icon: string;
  amount: number;
  amountUsd: number;
  changes: number;
};

function CoinCard({ title, icon, amount }: Props) {
  const navigate = useNavigate();
  return (
    <div className="coin-card" onClick={() => navigate(`/coin/${title}`)}>
      <div className="coin-card-title">
        <img src={icon} alt={title} />
        <div>
          <div>{title}</div>
          <div className="coin-card-title-amount">{amount} TON</div>
        </div>
      </div>
      <div className="coin-card-amount">
        <div>1323,34$</div>
        <div style={{ color: '#6ABD79', fontSize: '0.85rem' }}>+12.2%</div>
      </div>
    </div>
  );
}

export default CoinCard;

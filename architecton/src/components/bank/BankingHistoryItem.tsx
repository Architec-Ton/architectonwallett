import { MouseEventHandler } from 'react';
import './BankingHistory.styles.css';

type Props = {
  title: string;
  icon: string;
  date: string;
  symbol: string;
  changes: string;

  onClick?: MouseEventHandler;
};

function BankingHistoryItem({ title, icon, date, symbol, changes }: Props) {
  return (
    <div className="bank-mint-history-item">
      <div className="bank-mint-history-main">
        <img src={icon} />
        <div>
          <h3>{title}</h3>
          <p>{date}</p>
        </div>
      </div>
      <div className="bank-mint-history-desc">
        <h3>{changes}</h3>
        <p>{symbol}</p>
      </div>
    </div>
  );
}

export default BankingHistoryItem;

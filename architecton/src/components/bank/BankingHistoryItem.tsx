import { MouseEventHandler } from 'react';
import './BankingHistory.styles.css';
import Icon from '../ui/Icon';

type Props = {
  title: string;
  type: string;
  date: string;
  symbol?: string;
  changes?: string;

  onClick?: MouseEventHandler;
};

function BankingHistoryItem({ title, type, date, symbol, changes }: Props) {
  const time = new Date(date);

  const formattedTime = Intl.DateTimeFormat(undefined, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(time);

  return (
    <div className="bank-mint-history-item">
      <div className="bank-mint-history-main">
        <Icon src={`/icons/${type}.svg`} />
        <div>
          <h3>{title}</h3>
          <p>{formattedTime}</p>
        </div>
      </div>
      <div className="bank-mint-history-desc">
        <h3>{changes}</h3>
        <p className="color-primary">{symbol}</p>
      </div>
    </div>
  );
}

export default BankingHistoryItem;

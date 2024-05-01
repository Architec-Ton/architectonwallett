import './BankingHistory.styles.css';
import BankingHistoryItem from './BankingHistoryItem';
import { useNavigate } from 'react-router-dom';

type Props = {
  bankingHistory: string[];
};

function BankingHistory({ bankingHistory }: Props) {
  const now = new Date();
  const navigate = useNavigate();
  return (
    <div className="bank-mint-history">
      <div className="bank-mint-history-title">
        <h3>Banking history:</h3>
        {bankingHistory.length > 0 && (
          <a href="#" onClick={() => navigate('/bank/history')}>
            See all {'>'}
          </a>
        )}
      </div>
      <div className="bank-mint-history-list">
        {bankingHistory.length == 0 && (
          <BankingHistoryItem
            type={'launch'}
            title="Empty history"
            date={now.toISOString()}
          />
        )}
      </div>
    </div>
  );
}

export default BankingHistory;

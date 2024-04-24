import './BankingHistory.styles.css';
import BankingHistoryItem from './BankingHistoryItem';
import assets from '../../assets';

type Props = {
  bankingHistory: string[];
};

function BankingHistory({ bankingHistory }: Props) {
  return (
    <div className="bank-mint-history">
      <div className="bank-mint-history-title">
        <h3>Banking history:</h3>
        <a href="#">See all {'>'}</a>
      </div>
      <div className="bank-mint-history-list">
        {bankingHistory.length == 0 && (
          <BankingHistoryItem
            icon={assets.iconHistEmpty}
            title="Empty history"
            date="29 April 20:23"
            symbol="TON"
            changes="+1 Bank"
          />
        )}
      </div>
    </div>
  );
}

export default BankingHistory;

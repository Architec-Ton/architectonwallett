import classNames from 'classnames';
import './Workspace.styles.css';
import assets from '../../assets';

type Props = {
  bank_count: number;
  bank_income: number;
};

function Workspace({ bank_count, bank_income }: Props) {
  return (
    <div
      className={classNames({
        'selected-block': true,
        'square-block': true,
        workspace: true,
      })}>
      <h3>Workspace</h3>
      <div className="workspace-banks">
        <div className="workspace-banks-icon">
          <img src={assets.iconBankWhite} />
        </div>
        <div>{bank_count}</div>
      </div>
      <div className="workspace-bank-income">
        <h4>Bank Income</h4>
        <div>
          {bank_income} FAN <span>/ h</span>
        </div>
      </div>
    </div>
  );
}

export default Workspace;

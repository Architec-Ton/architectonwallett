import classNames from 'classnames';
import './Workspace.styles.css';
import assets from '../../assets';
import { useTranslation } from 'react-i18next';

type Props = {
  bank_count: number;
  bank_income: number;
  title?: string;
};

function Workspace({ title, bank_count, bank_income }: Props) {
  const { t } = useTranslation();
  return (
    <div
      className={classNames({
        'selected-block': true,
        'square-block': true,
        workspace: true,
      })}>
      <h3>{t(title)}</h3>
      <div className="workspace-banks">
        <div className="workspace-banks-icon">
          <img src={assets.iconBankWhite} />
        </div>
        <div>{bank_count}</div>
      </div>
      <div className="workspace-bank-income">
        <h4>Bank Income</h4>
        <div>
          {bank_income} $BNK <span>/ h</span>
        </div>
      </div>
    </div>
  );
}

Workspace.defaultProps = {
  title: 'workspace',
};

export default Workspace;

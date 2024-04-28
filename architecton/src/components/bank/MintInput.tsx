import { ChangeEventHandler } from 'react';
// import assets from '../../assets';
import './MintInput.styles.css';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

type Props = {
  icon: string;
  receive: boolean;
  balance: number;
  title: string;
  value: number;
  selected: boolean;
  onChange?: ChangeEventHandler<HTMLElement>;
};

function MintInput({
  icon,
  title,
  receive,
  selected,
  balance,
  value,
  onChange,
}: Props) {
  const { t } = useTranslation();
  return (
    <div
      className={classNames({
        mintinput: true,
        selected: selected,
      })}
      onClick={() => {
        console.log(selected);
        //onClick && onClick(!selected);
      }}>
      <div className="mintinput-header">
        <div>{receive ? t('mint_input_recv') : t('mint_input_send')}</div>
        <div>
          {t('mint_input_balance')}:{' '}
          {balance.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}
        </div>
      </div>
      <div className="mintinput-body">
        <div className="mintinput-title">
          <img src={icon} />
          <div>
            <h3>{title}</h3>
          </div>
        </div>
        <input
          className="mintinput-input"
          onChange={onChange}
          value={value}
          type="number"
        />
      </div>
    </div>
  );
}

MintInput.defaultProps = {
  receive: true,
  balance: 0,
  title: 'Bank',
};

export default MintInput;

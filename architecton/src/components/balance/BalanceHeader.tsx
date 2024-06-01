import classNames from 'classnames';
import './Balance.styles.css';
import assets from '../../assets';
import { useNavigate } from 'react-router-dom';
import { useTonConnect } from '../../hooks/useTonConnect';

//import { CHAIN } from '@tonconnect/ui-react';

type Props = {
  name: string;
  title: string;
  chain: string;
};

function BalanceHeader({ name, title, chain }: Props) {
  const navigate = useNavigate();
  const { connected } = useTonConnect();
  return (
    <div className={classNames('balance-header')}>
      <h2>
        <span>{name}</span> {title}
        {chain == 'CHAIN.TESTNET' ? (
          <small style={{ color: 'red', fontSize: '8px' }}> TESTNET </small>
        ) : (
          ''
        )}
      </h2>
      <div className="balance-wallet" onClick={() => navigate('/wallet')}>
        {connected && <img src={assets.iconWallet} />}
      </div>
    </div>
  );
  /* <img src={assets.svghdots} /> */
}

export default BalanceHeader;

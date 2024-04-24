import Layout2Row from '../layout/Layout2Row';
import Container from '../../components/ui/Container';
import { useTranslation } from 'react-i18next';
import BalanceBase from '../../components/balance/BalanceBase';
import Workspace from '../../components/bank/Workspace';
import Minting from '../../components/bank/MInting';
import { useEffect, useState } from 'react';
import BankingHistory from '../../components/bank/BankingHistory';

function Bank() {
  const { t } = useTranslation();

  const [mintingPercent, setMintingPercent] = useState<number>(0);
  const [tokenMint, setTokenMint] = useState<number>(0);
  // eslint-disable-next-line no-var
  var mintingPercentValue = mintingPercent;
  // eslint-disable-next-line no-var
  var tokenMintValue = tokenMint;

  useEffect(() => {
    const interval = setInterval(() => {
      setMintingPercent(mintingPercentValue);
      setTokenMint(tokenMintValue);
      mintingPercentValue += 0.1;
      tokenMintValue += 0.00001;
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout2Row>
      <Container>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '1rem',
          }}>
          <h2
            style={{
              textAlign: 'center',
            }}>
            {t('bank_mint_header')}
          </h2>

          <BalanceBase
            title="Architec.TON"
            bankCount={1}
            amount={tokenMint.toLocaleString(
              undefined,

              { minimumFractionDigits: 5 }
            )}
            symbol="FAN">
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <button>Mint</button>
              <button>Referal</button>
            </div>
          </BalanceBase>
        </div>
        <div className="two-column">
          <Workspace bank_count={1} bank_income={0.3} />
          <Minting bankers_count={1} mintingPercent={mintingPercent} />
        </div>
        <BankingHistory bankingHistory={[]} />
      </Container>
      <div className="footer" style={{ paddingBottom: '1rem' }}>
        <div>
          <p>
            Our <a href="#">Support Team</a>
          </p>
          <p>in Telegram</p>
        </div>
      </div>
    </Layout2Row>
  );
}

export default Bank;

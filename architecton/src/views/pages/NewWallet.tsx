import Container from '../../components/ui/Container';
import { useTranslation } from 'react-i18next';
import FooterButton from '../../components/buttons/FooterButton';
import Layout2Row from '../layout/Layout2Row';
import { useEffect, useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import { mnemonicNew, mnemonicToPrivateKey } from '@ton/crypto';
import { WalletContractV4 } from '@ton/ton';
//import { TonClient } from 'ton';
//import Input from '../../components/inputs/Input';
import Mnemonics from '../../components/wallet/Mnemonics';
import CheckMnemonic from '../../components/wallet/CheckMnemonic';

function NewWallet() {
  const { t } = useTranslation();
  //const navigate = useNavigate();
  const [mnemonics, setMnemonics] = useState<string[]>([]);
  const [walletState, setWalletState] = useState<number>(0);
  const [approved, setApproved] = useState<boolean>(false);

  const createWallet = async () => {
    if (mnemonics.length == 0) {
      const mn = await mnemonicNew();
      setMnemonics(mn);
      const keyPair = await mnemonicToPrivateKey(mn);
      console.log(keyPair);

      // Create wallet contract
      const workchain = 0; // Usually you need a workchain 0
      const wallet = WalletContractV4.create({
        workchain,
        publicKey: keyPair.publicKey,
      });
      //   const client = new TonClient({
      //     endpoint: 'https://toncenter.com/api/v2/jsonRPC',
      //   });
      //const contract = client.open(wallet);

      console.log(wallet.address.toString());
    }
  };

  const onClick = async () => {
    setWalletState(walletState + 1);
  };

  useEffect(() => {
    if (walletState == 0) createWallet();
  }, []);

  //const mnemonics = ['people', 'mople', 'jople'];
  console.log(walletState == 1 && approved, walletState, approved);
  return (
    <Layout2Row>
      <Container>
        <div>
          <h2
            style={{
              textAlign: 'center',
            }}>
            {t(`new_wallet_header_${walletState}`)}
          </h2>
          {walletState == 1 && (
            <CheckMnemonic
              mnemonics={mnemonics}
              checkIndex={[2, 7, 16]}
              setApprove={setApproved}
            />
          )}
          {walletState == 0 && <Mnemonics mnemonics={mnemonics} />}
        </div>
      </Container>
      <div className="footer">
        <div>
          <p>
            Our <a href="#">Support Team</a>
          </p>
          <p>in Telegram</p>
        </div>
        <FooterButton
          title={t('btn_next')}
          onClick={() => onClick()}
          //disabled={walletState == 1 && !approved}
        />
      </div>
    </Layout2Row>
  );
}

export default NewWallet;

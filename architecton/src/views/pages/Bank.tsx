import Layout2Row from '../layout/Layout2Row';
import Container from '../../components/ui/Container';
import { useTranslation } from 'react-i18next';
import BalanceBase from '../../components/balance/BalanceBase';
import Workspace from '../../components/bank/Workspace';
import Minting from '../../components/bank/MInting';
import { useEffect, useState } from 'react';
import BankingHistory from '../../components/bank/BankingHistory';
// import { useAuth } from '../../hooks/useAuth';
import { IBankOut } from '../../types/api/bank';
import { TonConnectButton, useTonAddress } from '@tonconnect/ui-react';
import { useNavigate } from 'react-router-dom';
import { useTonConnect } from '../../hooks/useTonConnect';
import useApi from '../../hooks/useApi';
import Footer from '../../components/ui/Footer';
import assets from '../../assets';
import Button from '../../components/buttons/Button';
import { useCloudStorage, useInitData, usePopup } from '@tma.js/sdk-react';
import { Address } from '@ton/core';
//import { useTonClient } from '../../hooks/useTonClient';
//import { Address } from '@ton/core';
//import useCrowdSaleContract from '../../hooks/useCrowdSaleContract';

function Bank() {
  const { t } = useTranslation();

  //const { auth, setAuth } = useAuth();

  //const wallet = useTonWallet();

  const initData = useInitData();

  const [isGLoading, setIsGLoading] = useState<boolean>(true);

  const [refActive, setRefActive] = useState<boolean>(true);

  const [bankInfo, setBankInfo] = useState<IBankOut>({
    balance: null,
    bank: {
      bankBankers: 0,
      bankFree: 0,
      bankTotal: 0,
    },
  } as IBankOut);

  const { connected } = useTonConnect();

  const userFriendlyAddress = useTonAddress();

  const storageTelegram = useCloudStorage();

  const popup = usePopup();

  const navigate = useNavigate();

  //const { crowdSale, sendInc } = useCrowdSaleContract();

  const { data, isLoading, fetchData, error, writeData, setIsLoading } =
    useApi();

  // useEffect(() => {

  //   if (ref && ref != '' && userFriendlyAddress) {
  //     Address.parse
  //     storageTelegram.set('ref', ref);
  //   } else if (userFriendlyAddress && userFriendlyAddress == ref) {
  //     //console.log('This you address:', userFriendlyAddress, ref);
  //     popup.open({
  //       title: 'Referral link wrong!',
  //       message:
  //         "Oops! 🙈 It seems like your referral link points to your own account and won't be applied. 🔒",
  //       //buttons: [{ id: 'my-id', type: 'default', text: 'Default text' }],
  //     });
  //   }
  // }, [userFriendlyAddress, ref]);

  useEffect(() => {
    const preRun = async () => {
      const tgid = initData.user.id;
      let ref = initData.startParam;
      if (
        ref &&
        userFriendlyAddress &&
        Address.parse(ref).hash == Address.parse(userFriendlyAddress).hash
      ) {
        ref = null;
      }
      if (!ref) {
        ref = await storageTelegram.get('ref');
      }
      if (ref && ref != '' && userFriendlyAddress) {
        console.log('ref', ref, userFriendlyAddress);
        const ref_addr = Address.parse(ref);

        if (userFriendlyAddress) {
          const owner_addr = Address.parse(userFriendlyAddress);

          if (ref_addr.equals(owner_addr)) {
            await storageTelegram.set('ref', null);
            ref = null;
            popup.open({
              title: 'Referral link wrong!',
              message:
                "Oops! 🙈 It seems like your referral link points to your own account and won't be applied. 🔒",
              //buttons: [{ id: 'my-id', type: 'default', text: 'Default text' }],
            });
            setRefActive(false);
          }
        }
        if (ref) {
          setRefActive(true);
          ref = ref_addr.toString({ urlSafe: true, bounceable: true });
          await storageTelegram.set('ref', ref);
        }
      }

      console.log('ref', ref);
      console.log('userFriendlyAddress', userFriendlyAddress);
      console.log('fetch banks:', tgid, userFriendlyAddress);

      if (userFriendlyAddress) {
        setIsGLoading(true);
        await fetchData(
          `/bank/${
            userFriendlyAddress ? userFriendlyAddress : 'none'
          }?tgid=${tgid}&ref=${ref}`
        );
      } else {
        setIsGLoading(false);
      }
      //console.log('fetch banks finish:', tgid, userFriendlyAddress);
    };
    preRun();
  }, [userFriendlyAddress, initData, connected]);

  useEffect(() => {
    if (!isLoading && error == null && data) {
      // console.log('set data', data);
      const dt: IBankOut = data as IBankOut;
      const ref = initData.startParam;

      if (bankInfo.balance && !dt.balance) {
        // console.log('Skip this input ', dt);
        // console.log('Skip this bankInfo ', bankInfo);
      } else {
        // console.log('set this input ', dt);
        // console.log('Set this bankInfo ', bankInfo);
        setBankInfo(dt);
        if (ref && ref != '' && bankInfo.referral === null) {
          popup.open({
            title: 'Referral wrong!',
            message:
              "Oops! 🙈 It seems like your referral link points to your own account and won't be applied. 🔒",
            //buttons: [{ id: 'my-id', type: 'default', text: 'Default text' }],
          });
        }
      }
      setIsGLoading(isLoading);
    }
  }, [isLoading, data]);

  useEffect(() => {
    if (data && bankInfo) {
      // console.log('bankInfo data', bankInfo);
      if (!bankInfo.account) {
        writeData(
          `/account/${userFriendlyAddress ? userFriendlyAddress : 'none'}`,
          initData.user
        );
      }
    }
  }, [bankInfo]);

  return (
    <Layout2Row>
      <Container isLoading={isGLoading} loadingTitle="Bank Mint">
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
            bankCount={bankInfo.balance?.bankAmount}
            amount={bankInfo.balance?.bnkAmount.toLocaleString(undefined, {
              minimumFractionDigits: 5,
            })}
            symbol="$BNK">
            {connected && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <Button
                  title={t('Mint')}
                  icon={assets.iconBankWhite}
                  onClick={() => navigate('/bank/mint')}
                />
                <Button
                  title={t('Referrals')}
                  icon={assets.iconRef}
                  onClick={() => navigate('/bank/referral')}
                  disabled={bankInfo.balance?.bankAmount == 0}
                />
              </div>
            )}
            {!connected && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <TonConnectButton />
              </div>
            )}
          </BalanceBase>
        </div>
        <div className="two-column">
          <Workspace
            bank_count={bankInfo.balance?.bankAmount}
            bank_income={0}
          />
          <Minting
            bankers_count={bankInfo.bank.bankBankers}
            maxBanks={bankInfo.bank.bankTotal}
            freeBanks={bankInfo.bank.bankFree}
            mintingPercent={
              bankInfo.bank.bankTotal
                ? (1 - bankInfo.bank.bankFree / bankInfo.bank.bankTotal) * 100
                : 0
            }
          />
        </div>
        <BankingHistory
          bankingHistory={bankInfo.histories ? bankInfo.histories : []}
        />
      </Container>
      <Footer />
    </Layout2Row>
  );
}

export default Bank;

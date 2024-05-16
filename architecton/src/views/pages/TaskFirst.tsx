import { useTranslation } from 'react-i18next';
import Layout2Row from '../layout/Layout2Row';
import Container from '../../components/ui/Container';
import Footer from '../../components/ui/Footer';
import assets from '../../assets';
import TaskButton from '../../components/tasks/TaskButton';
import FooterButton from '../../components/buttons/FooterButton';
import { useCloudStorage, useInitData, useUtils } from '@tma.js/sdk-react';
import { useTonAddress } from '@tonconnect/ui-react';
import useApi from '../../hooks/useApi';
import { useEffect, useState } from 'react';

function TasksFirst() {
  const { t } = useTranslation();
  const utils = useUtils();
  const initData = useInitData();
  const userFriendlyAddress = useTonAddress();
  const storageTelegram = useCloudStorage();

  const [btnName, setBtnName] = useState<string>('task_check');
  const [btnState, setBtnState] = useState<string[]>([
    assets.iconArrow,
    assets.iconArrow,
    assets.iconArrow,
    assets.iconArrow,
    assets.iconArrow,
    null,
  ]);

  const { isLoading, fetchData, setIsLoading } = useApi();

  useEffect(() => {
    //storageTelegram.set('task1', null);
    setIsLoading(false);
  }, []);

  const onCheck = async () => {
    if (initData && userFriendlyAddress && storageTelegram) {
      btnState[1] = (await onTgCheck('twitter'))
        ? assets.iconOk
        : assets.iconFail;
      btnState[2] = (await onTgCheck('investkingyru'))
        ? assets.iconOk
        : assets.iconFail;
      btnState[3] = (await onTgCheck('meta')) ? assets.iconOk : assets.iconFail;

      let fail = true;
      if (
        btnState[2] == assets.iconOk &&
        btnState[3] == assets.iconOk &&
        btnState[1] == assets.iconOk
      )
        fail = false;

      const resp = await fetchData(
        `/task/1/${userFriendlyAddress}?tgid=${initData.user.id}&fail=${fail}`
      );

      if (resp) {
        console.log(resp);
        let idx = 0;
        for (const e in resp.tasks) {
          console.log(e);
          if (resp.tasks[e].id == 'main') {
            idx = 0;
          }
          if (resp.tasks[e].id == 'chat') {
            idx = 4;
          }
          if (resp.tasks[e].id == 'balance') {
            idx = 5;
          }
          btnState[idx] = resp.tasks[e].completed
            ? assets.iconOk
            : assets.iconFail;
        }

        if (
          resp.completed &&
          btnState[2] == assets.iconOk &&
          btnState[3] == assets.iconOk &&
          btnState[1] == assets.iconOk
        ) {
          setBtnName('task_completed');
        }
      }
      setBtnState(btnState);
    }
  };

  const onTgCheck = async (channel: string) => {
    const task1 = await storageTelegram.get('task1');
    console.log('Storage tsak:', task1);
    if (task1) {
      const tsk1 = task1.split(',');
      return tsk1.find((e) => e === channel);
    }
    return false;
  };

  const onTgSet = async (channel: string) => {
    const task1 = await storageTelegram.get('task1');
    let tsk1 = [];
    if (task1) {
      tsk1 = task1.split(',');
    }
    if (tsk1.find((e) => e === channel)) {
      console.log(channel, ' exists');
    } else {
      tsk1.push(channel);
      console.log('safe', tsk1.join(','));
      await storageTelegram.set('task1', tsk1.join(','));
    }
  };

  return (
    <Layout2Row>
      <Container isLoading={isLoading} loadingTitle={t(`tasks_title`)}>
        <div>
          <h2
            style={{
              textAlign: 'center',
            }}>
            {t(`task_first`)}
          </h2>
        </div>
        <div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              rowGap: '1rem',
              paddingTop: '2rem',
            }}>
            <TaskButton
              icon={assets.taskArchitecton}
              title="Architec.ton RU"
              subTitle="Subscribe to the main channel of the project"
              onClick={() =>
                utils.openTelegramLink('https://t.me/architecton_tech')
              }
              iconState={btnState[0]}
            />
            <TaskButton
              icon={assets.taskX}
              title="Architec.ton X"
              subTitle="Subscribe to the official Twitter account of the project"
              onClick={async () => {
                await onTgSet('twitter');
                utils.openLink(
                  'https://x.com/architec_ton?t=lYEwFomkXGq0n9FMUg0VCw&s=09'
                );
              }}
              iconState={btnState[1]}
            />
            <TaskButton
              icon={assets.taskKunguru}
              title="Investment Kingyru"
              subTitle="Subscribe to the Kingyru channel"
              onClick={async () => {
                await onTgSet('investkingyru');
                utils.openTelegramLink('https://t.me/investkingyru');
              }}
              iconState={btnState[2]}
            />
            <TaskButton
              icon={assets.taskMeta}
              title="Meta Silense TON"
              subTitle="Subscribe to Metukhin's main channel"
              onClick={async () => {
                await onTgSet('meta');
                utils.openTelegramLink('https://t.me/ToNmetasilense');
              }}
              iconState={btnState[3]}
            />
            <TaskButton
              icon={assets.taskArch}
              title="Architec.ton Chat"
              subTitle="Join the main chat of the project"
              onClick={() =>
                utils.openTelegramLink('https://t.me/architec_ton')
              }
              iconState={btnState[4]}
            />
            <TaskButton
              icon={assets.taskWallet}
              title="Balance Bank Mint"
              subTitle="It is necessary to have at least 3 BNK on balance"
              iconState={btnState[5]}
            />
          </div>
        </div>
      </Container>
      <Footer>
        <FooterButton disabled={false} title={t(btnName)} onClick={onCheck} />
      </Footer>
    </Layout2Row>
  );

  // //{!isLoading && <Projects tokens={data.tokens} />}
}

export default TasksFirst;

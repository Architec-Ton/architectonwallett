import { useTranslation } from 'react-i18next';
import Layout2Row from '../layout/Layout2Row';
import Container from '../../components/ui/Container';
import Footer from '../../components/ui/Footer';
import TasksBlock from '../../components/tasks/TaskBlock';
import assets from '../../assets';
import { useNavigate } from 'react-router-dom';

function Tasks() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Layout2Row>
      <Container isLoading={false} loadingTitle={t(`tasks_title`)}>
        <div>
          <h2
            style={{
              textAlign: 'center',
            }}>
            {t(`tasks_title`)}
          </h2>
        </div>
        <div className="two-column">
          <TasksBlock
            btnTitle="Reward: 1"
            btnIcon={assets.iconBankWhite}
            onClick={() => navigate('/tasks/first')}>
            <div className="bank-content-icons">
              <img src={assets.taskArchitecton} />
              <img src={assets.taskX} />
              <img src={assets.taskKunguru} />
              <img src={assets.taskArch} />
              <img src={assets.taskWallet} />
            </div>
          </TasksBlock>
          <TasksBlock btnTitle="Soon..." title="Partners" btnDisabled={true}>
            <div className="bank-content-center">
              <img src={assets.taskTimer} />
            </div>
          </TasksBlock>
        </div>
        <div
          className="text-small"
          style={{
            padding: '0rem 1rem',
            fontSize: '0.75rem',
          }}>
          * You can receive rewards for completing a number of tasks in our
          quests
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: '2rem',
          }}></div>
      </Container>
      <Footer></Footer>
    </Layout2Row>
  );

  // //{!isLoading && <Projects tokens={data.tokens} />}
}

export default Tasks;

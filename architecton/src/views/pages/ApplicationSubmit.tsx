import BottomNavBar from '../../components/bottom-nav-bar/BottomNavBar';
import ApplicationSubmitHeader from '../../components/settings/application/ApplicationSubmitHeader';
import ApplicationSubmitForm from '../../components/settings/application/SubmitForm';
import Container from '../../components/ui/Container';
import Layout2 from '../layout/Layout2';

const ApplicationSubmit = () => {
  return (
    <Layout2>
      <Container>
        <ApplicationSubmitHeader />
        <ApplicationSubmitForm />
      </Container>
      <BottomNavBar />
    </Layout2>
  );
};

export default ApplicationSubmit;

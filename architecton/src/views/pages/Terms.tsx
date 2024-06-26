import BottomNavBar from '../../components/bottom-nav-bar/BottomNavBar';
import TermsContent from '../../components/settings/application/TermsContent';
import Container from '../../components/ui/Container';
import Layout2 from '../layout/Layout2';

const Terms = () => {
  return (
    <Layout2>
      <Container>
        <TermsContent />
      </Container>
      <BottomNavBar />
    </Layout2>
  );
};

export default Terms;

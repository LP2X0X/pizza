import { Outlet } from 'react-router';
import Header from './Header';
import Footer from './Footer';
import { useNavigation } from 'react-router';
import Loader from './Loader';
import styles from './AppLayout.module.css';

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <main className={styles.appLayout}>
      {isLoading && <Loader />}
      <Header />
      <div className={styles.appLayoutMainContent}>
        <Outlet />
      </div>
      <Footer />
    </main>
  );
}

export default AppLayout;

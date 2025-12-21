import { useSelector } from 'react-redux';
import CreateUser from '../features/user/CreateUser';
import { getUserName } from '../features/user/userSlice';
import { useNavigate } from 'react-router';
import styles from './Home.module.css';
import Button from './Button';

function Home() {
  const userName = useSelector(getUserName);
  const navigate = useNavigate();

  return (
    <article className={styles.home}>
      <h1 className={styles.mainHeader}>
        The best pizza.
        <br />
        <span className={styles.mainHeaderSubtitle}>
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {userName ? (
        <Button onClick={() => navigate('/menu')}>
          Continue ordering, {userName}
        </Button>
      ) : (
        <CreateUser />
      )}
    </article>
  );
}

export default Home;

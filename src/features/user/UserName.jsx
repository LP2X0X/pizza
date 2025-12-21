import { useSelector } from 'react-redux';
import styles from './UserName.module.css';

function UserName() {
  const userName = useSelector((state) => state.user.userName);

  if (!userName) return null;

  return <p className={styles.username}>{userName}</p>;
}

export default UserName;

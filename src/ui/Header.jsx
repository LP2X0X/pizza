import { Link } from 'react-router';
import UserName from '../features/user/UserName';
import SearchOrder from '../features/order/SearchOrder';
import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.headerLink}>
        The Pizza Slice Co.
      </Link>
      <SearchOrder />
      <UserName />
    </header>
  );
}

export default Header;

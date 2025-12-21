import { Link } from 'react-router';
import styles from './LinkButton.module.css';

function LinkButton({ to, type, children }) {
  return (
    <Link to={to} className={`${styles.linkButton} ${styles[type]}`}>
      {children}
    </Link>
  );
}

export default LinkButton;

import { useSelector } from 'react-redux';
import CartOverview from '../features/cart/CartOverview';
import { getTotalQuantity } from '../features/cart/cartSlice';
import styles from './Footer.module.css';

function Footer() {
  const totalQuantity = useSelector(getTotalQuantity);

  return (
    <footer className={styles.footer}>
      {totalQuantity > 0 && <CartOverview />}
    </footer>
  );
}

export default Footer;

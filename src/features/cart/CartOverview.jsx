import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router';
import { getTotalCartPrice, getTotalQuantity } from './cartSlice';
import styles from './CartOverview.module.css';
import LinkButton from '../../ui/LinkButton';

function CartOverview() {
  const quantity = useSelector(getTotalQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const location = useLocation();

  const isAtCartLocation = location.pathname.includes('cart');

  return (
    <div className={styles.cartOverview}>
      <p className={styles.cartOverviewInfo}>
        <span>{`${quantity} ${quantity > 1 ? 'Pizzas' : 'Pizza'}`}</span>
        <span>{`$${totalCartPrice}`}</span>
      </p>
      {!isAtCartLocation && (
        <LinkButton to="/cart">Open Cart &rarr;</LinkButton>
      )}
    </div>
  );
}

export default CartOverview;

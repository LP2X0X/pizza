import { useNavigate } from 'react-router';
import LinkButton from '../../ui/LinkButton';
import styles from './EmptyCart.module.css';

function EmptyCart({ type }) {
  return (
    <div className={styles.emptyCart}>
      <LinkButton to="/menu" type="back">
        &larr; Back to menu
      </LinkButton>
      {type !== 'fromCreateOrder' && (
        <p className={styles.emptyCartMessage}>
          Your cart is still empty. Start adding some pizzas :)
        </p>
      )}
    </div>
  );
}

export default EmptyCart;

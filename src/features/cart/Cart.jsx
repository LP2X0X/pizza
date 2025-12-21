import { useDispatch, useSelector } from 'react-redux';
import { getUserName } from '../user/userSlice';
import { clearCart, getCart } from './cartSlice';
import CartItem from './CartItem';
import EmptyCart from './EmptyCart';
import { useNavigate } from 'react-router';
import LinkButton from '../../ui/LinkButton';
import styles from './Cart.module.css';
import Button from '../../ui/Button';

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userName = useSelector(getUserName);
  const cart = useSelector(getCart);

  if (!cart.length) return <EmptyCart />;

  return (
    <article className={styles.cart}>
      <LinkButton type="back" to="/menu">
        &larr; Back to menu
      </LinkButton>

      <h3 className={styles.header}>Your cart, {userName}</h3>
      <ul className={styles.itemsContainer}>
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>
      <div className={styles.buttonContainer}>
        <Button onClick={() => navigate('/order/new')}>order pizza</Button>
        <Button type="clear" onClick={() => dispatch(clearCart())}>
          clear cart
        </Button>
      </div>
    </article>
  );
}

export default Cart;

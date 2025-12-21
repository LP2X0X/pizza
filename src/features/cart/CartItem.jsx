import { useDispatch } from 'react-redux';
import UpdateItemQuantity from '../order/UpdateItemQuantity';
import { deleteItem } from './cartSlice';
import styles from './CartItem.module.css';
import Button from '../../ui/Button';

function CartItem({ item }) {
  const dispatch = useDispatch();

  const formatedPrice = Number(item.totalPrice).toFixed(2);

  return (
    <li className={styles.item}>
      <h4
        className={styles.itemQuantityAndName}
      >{`${item.quantity} x ${item.name}`}</h4>
      <div className={styles.itemPriceAndActions}>
        <p className={styles.itemPrice}>${formatedPrice}</p>
        <UpdateItemQuantity id={item.pizzaId} quantity={item.quantity} />
        <Button type="small" onClick={() => dispatch(deleteItem(item.pizzaId))}>
          Delete
        </Button>
      </div>
    </li>
  );
}

export default CartItem;

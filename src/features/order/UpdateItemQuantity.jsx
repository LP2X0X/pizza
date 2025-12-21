import { useDispatch } from 'react-redux';
import { decreaseItemQuantity, increateItemQuantity } from '../cart/cartSlice';
import styles from './UpdateItemQuantity.module.css';
import Button from '../../ui/Button';

function UpdateItemQuantity({ id, quantity }) {
  const dispatch = useDispatch();

  return (
    <div className={styles.updateQuantityButtonContainer}>
      <Button onClick={() => dispatch(increateItemQuantity(id))} type="small">
        +
      </Button>
      <p>{quantity}</p>
      <Button onClick={() => dispatch(decreaseItemQuantity(id))} type="small">
        -
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;

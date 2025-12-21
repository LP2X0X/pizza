import styles from './OrderItem.module.css';

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className={styles.orderItem}>
      <div className={styles.orderItemNameAndPrice}>
        <p>
          <span className={styles.orderItemQuantity}>{quantity} x</span> {name}
        </p>
        <p className={styles.orderItemPrice}>${totalPrice.toFixed(2)}</p>
      </div>

      <p className={styles.orderItemIngredients}>
        {isLoadingIngredients ? 'Loading...' : ingredients.join(', ')}
      </p>
    </li>
  );
}

export default OrderItem;

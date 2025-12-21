import { useDispatch, useSelector } from 'react-redux';
import { addItem, deleteItem, getQuantityById } from '../cart/cartSlice';
import IncreaseItemQuantity from '../order/UpdateItemQuantity';
import styles from './MenuItem.module.css';
import Button from '../../ui/Button';

function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  const { id, name, imageUrl, soldOut, unitPrice, ingredients } = pizza;
  const itemQuantity = useSelector(getQuantityById(id));
  const formatedPrice = Number(unitPrice).toFixed(2);

  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  }

  function handleDeleteItem(id) {
    dispatch(deleteItem(id));
  }

  return (
    <li className={styles.menuItem}>
      <img
        className={styles.menuItemImage}
        src={imageUrl}
        alt={`Image of a ${name} pizza`}
      />
      <div className={styles.menuItemInfo}>
        <h3 className={styles.menuItemName}>{name}</h3>
        <p className={styles.menuItemIngredients}>{ingredients.join(', ')}</p>
      </div>
      <div className={styles.menuItemPriceAndActions}>
        {soldOut ? (
          <p className={styles.menuItemSoldOut}>Sold out</p>
        ) : (
          <>
            <p>${formatedPrice}</p>
            {itemQuantity > 0 ? (
              <div className={styles.menuItemActions}>
                <IncreaseItemQuantity id={id} quantity={itemQuantity} />
                <Button type="small" onClick={() => handleDeleteItem(id)}>
                  delete
                </Button>
              </div>
            ) : (
              <Button onClick={handleAddToCart} type="small">
                Add To Cart
              </Button>
            )}
          </>
        )}
      </div>
    </li>
  );
}

export default MenuItem;

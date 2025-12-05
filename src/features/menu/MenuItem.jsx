import { useDispatch, useSelector } from "react-redux";
import { addItem, getQuantityById } from "../cart/cartSlice";
import IncreaseItemQuantity from "../order/UpdateItemQuantity";

function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  const { id, name, imageUrl, soldOut, unitPrice, ingredients } = pizza;
  const itemQuantity = useSelector(getQuantityById(id));

  function handleAddToCart() {
    const newItem = {
      id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  }

  return (
    <article>
      <h3>{name}</h3>
      <img src={imageUrl} alt={`Image of a ${name} pizza`} />
      <p>{ingredients.join(", ")}</p>
      {soldOut ? (
        <p>Sold out</p>
      ) : (
        <>
          <p>{unitPrice}</p>
          <button onClick={handleAddToCart}>Add To Cart</button>
        </>
      )}
      {itemQuantity > 0 && (
        <IncreaseItemQuantity id={id} quantity={itemQuantity} />
      )}
    </article>
  );
}

export default MenuItem;

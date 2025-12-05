import { useDispatch } from "react-redux";
import { decreaseItemQuantity, increateItemQuantity } from "../cart/cartSlice";

function UpdateItemQuantity({ id, quantity }) {
  const dispatch = useDispatch();
  return (
    <div>
      <button onClick={() => dispatch(increateItemQuantity(id))}>+</button>
      <p>{quantity}</p>
      <button onClick={() => dispatch(decreaseItemQuantity(id))}>-</button>
    </div>
  );
}

export default UpdateItemQuantity;

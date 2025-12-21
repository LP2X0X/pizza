import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice';
import { Form, redirect, useActionData, useNavigation } from 'react-router';
import { fetchAddress } from '../user/userSlice';
import store from '../../Store';
import EmptyCart from '../cart/EmptyCart';
import styles from './CreateOrder.module.css';
import Button from '../../ui/Button';

const API_URL = 'https://react-fast-pizza-api.jonas.io/api';

const isValidPhoneNumber = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const { userName, address, position, addressStatus } = useSelector(
    (state) => state.user
  );
  const firstName = userName.split(' ').at(0);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

  const errors = useActionData();

  function handleGetPosition(e) {
    e.preventDefault();
    dispatch(fetchAddress());
  }

  if (!cart.length) return <EmptyCart type="fromCreateOrder" />;

  return (
    <Form method="POST" className={styles.createOrderForm}>
      <h2 className={styles.createOrderFormHeader}>
        Ready to order? Let's go!
      </h2>
      <div className={styles.createOrderInputSectionContainer}>
        <section className={styles.createOrderSection}>
          <label>First name</label>
          <input
            type="text"
            name="customer"
            defaultValue={firstName}
            className={styles.formInput}
            required
            autocomplete="off"
          ></input>
        </section>

        <section className={styles.createOrderSection}>
          <label>Phone number</label>
          <input
            type="tel"
            name="phone"
            className={styles.formInput}
            autocomplete="off"
            required
          ></input>
        </section>
        {errors?.phone && (
          <p className={`${styles.fadeIn} ${styles.warning}`}>
            {errors?.phone}
          </p>
        )}

        <section
          className={`${styles.createOrderSection} ${styles.addressSection}`}
        >
          <label>Address</label>
          <input
            type="text"
            name="address"
            defaultValue={address}
            className={styles.formInput}
            autocomplete="off"
            required
          ></input>
          {addressStatus !== 'fulfilled' && addressStatus !== 'error' && (
            <Button type="address" onClick={handleGetPosition}>
              {addressStatus === 'loading'
                ? 'Getting position...'
                : 'Get position'}
            </Button>
          )}
        </section>

        {addressStatus === 'error' && (
          <p className={`${styles.fadeIn} ${styles.warning}`}>
            There was a problem getting your address. Make sure to fill this
            field.
          </p>
        )}

        <section className={styles.createOrderCheckbox}>
          <input type="checkbox" name="priority"></input>
          <label>Want to give your order priority?</label>
        </section>
      </div>

      <div>
        <input type="hidden" name="cart" value={JSON.stringify(cart)}></input>
        <input
          type="hidden"
          name="position"
          value={
            position.latitude && position.longitude
              ? `${position.latitude}, ${position.longitude}`
              : ''
          }
        ></input>
      </div>
      <Button>
        {isSubmitting
          ? `Placing order...`
          : `Order now from $${totalCartPrice.toFixed(2)}`}
      </Button>
    </Form>
  );
}

export default CreateOrder;

export async function action({ request }) {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    const errors = {};

    if (!isValidPhoneNumber(data.phone)) {
      errors.phone =
        'Please give us your correct phone number. We might need it to connect you.';
      return errors;
    }

    const order = {
      ...data,
      priority: data.priority === 'on',
      cart: JSON.parse(data.cart),
    };

    const res = await fetch(`${API_URL}/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });

    if (!res.ok) {
      throw new Error('Sending order failed...');
    }

    // I need to clear the cart here
    // But I can not use useDispatch hook since I'm not in a component
    store.dispatch(clearCart());

    const newOrder = await res.json();

    return redirect(`/order/${newOrder.data.id}`);
  } catch (err) {
    console.log(err);
  }
}

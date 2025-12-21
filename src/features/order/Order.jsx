import { useFetcher, useLoaderData } from 'react-router';
import CountDownTimer from './CountDownTimer';
import OrderItem from './OrderItem';
import { useEffect, useState } from 'react';
import UpdateOrderPriority from './UpdateOrderPriority';
import styles from './Order.module.css';

const API_URL = 'https://react-fast-pizza-api.jonas.io/api/order';

function Order() {
  const [hasOrderArrived, setHasOrderArrived] = useState(false);
  const loaderData = useLoaderData();
  const fetcher = useFetcher();

  const isLoadingIngredients = fetcher.state === 'loading';

  useEffect(
    function () {
      // If we don't have a condition here
      // When Order first mount, fetcher's load methods get called
      // which change other properties of fetcher itself
      // which makes it a different object
      // which cause an infinite loops since fetcher is in our dependency array
      if (!fetcher.data && fetcher.state === 'idle') fetcher.load('/menu');
      // When the action of the route corresponding to this component run
      // This effect will get executed again even though the pizza menu data from the loader of the menu route does change
      // We could use context api to set the data for Order component to use
    },
    [fetcher]
  );

  const {
    id,
    status,
    priority,
    cart,
    orderPrice,
    priorityPrice,
    estimatedDelivery,
  } = loaderData.data;

  return (
    <article className={styles.order}>
      <header className={styles.orderHeader}>
        <h2 className={styles.orderId}>Order #{id} status</h2>

        <div className={styles.orderSideInfo}>
          {priority && <p className={styles.priorityInfo}>priority</p>}
          <p className={styles.orderStatusInfo}>{status} order</p>
        </div>
      </header>

      <CountDownTimer
        estimatedDelivery={estimatedDelivery}
        setHasOrderArrived={setHasOrderArrived}
      />

      <ul className={styles.orderItemContainer}>
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            isLoadingIngredients={isLoadingIngredients}
            ingredients={
              fetcher.data?.find((pizza) => pizza.id === String(item.pizzaId))
                ?.ingredients ?? []
            }
          />
        ))}
      </ul>

      <section className={styles.prices}>
        <p className={styles.individualPrice}>
          Price of pizzas: ${orderPrice.toFixed(2)}
        </p>
        {priorityPrice > 0 && (
          <p className={styles.individualPrice}>
            Priority price: ${priorityPrice.toFixed(2)}
          </p>
        )}
        <p className={styles.totalPrice}>
          To pay on delivery: ${(orderPrice + priorityPrice).toFixed(2)}
        </p>
      </section>

      {!priority && !hasOrderArrived && <UpdateOrderPriority />}
    </article>
  );
}

export default Order;

export async function loader({ params }) {
  const res = await fetch(`${API_URL}/${params.id}`);

  if (!res.ok) {
    throw new Error(`Couldn't find order #${params.id}`);
  }

  const data = await res.json();
  return data;
}

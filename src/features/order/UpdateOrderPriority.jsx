import { useFetcher } from 'react-router';
import Button from '../../ui/Button';
import styles from './UpdateOrderPriority.module.css';

const API_URL = 'https://react-fast-pizza-api.jonas.io/api';

function UpdateOrderPriority() {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === 'submitting';

  return (
    <fetcher.Form method="PATCH" className={styles.form}>
      <Button type="small">
        {isSubmitting ? 'Marking order priority...' : 'Make priority'}
      </Button>
    </fetcher.Form>
  );
}

export default UpdateOrderPriority;

export async function action({ params }) {
  const data = { priority: true };
  const res = await fetch(`${API_URL}/order/${params.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok)
    throw new Error('Can not update your order priority right now...');

  return null;
}

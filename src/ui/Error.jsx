import { useRouteError } from 'react-router';
import styles from './Error.module.css';
import LinkButton from './LinkButton';

function Error() {
  const error = useRouteError();
  return (
    <article className={styles.error}>
      <h2 className={styles.errorHeader}>There is something wrong...</h2>
      {error.data ? (
        <p className={styles.errorMessage}>{error.data}</p>
      ) : (
        <p className={styles.errorMessage}>{error.message}</p>
      )}
      <LinkButton to={-1} type="back">
        &larr; Go back
      </LinkButton>
    </article>
  );
}

export default Error;

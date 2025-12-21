import { useState } from 'react';
import { useNavigate } from 'react-router';
import styles from './SearchOrder.module.css';

function SearchOrder() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={`${styles.search} input`}
      ></input>
    </form>
  );
}

export default SearchOrder;

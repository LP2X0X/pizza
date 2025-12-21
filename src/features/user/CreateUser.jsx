import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from './userSlice';
import { useNavigate } from 'react-router';
import styles from './CreateUser.module.css';
import Button from '../../ui/Button';

function CreateUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const inputRef = useRef();

  useEffect(function () {
    inputRef.current.focus();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (!userName) return;
    dispatch(createUser(userName));
    navigate('/menu');
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>
        <span>👋</span> Welcome! Please start by telling us your name:
      </label>
      <input
        type="text"
        placeholder="Your full name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        ref={inputRef}
        name="userName"
        className={`${styles.formInput} input`}
        autoComplete="off"
      ></input>
      {userName && <Button>Start Ordering</Button>}
    </form>
  );
}

export default CreateUser;

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  decrement,
  increment,
  incrementByAmount,
  selectCount,
  incrementAsync,
} from '../../actions';
import styles from './Counter.module.css';

export function Counter({...props}) {
  const { dispatch } = props;
  const count = useSelector(selectCount);
  const [incrementAmount, setIncrementAmount] = useState('2');

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={e => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() =>
            dispatch(incrementByAmount(Number(incrementAmount) || 0))
          }
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}
        >
          Add Async
        </button>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps)(Counter)

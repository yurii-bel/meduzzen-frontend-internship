interface CounterState {
  count: number;
}

const initialState: CounterState = {
  count: 0,
};

const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";

export const increment = (amount: number): Actions => {
  return {
    type: INCREMENT,
    payload: amount,
  };
};

export const decrement = (amount: number): Actions => {
  return {
    type: DECREMENT,
    payload: amount,
  };
};

export interface Actions {
  type: typeof INCREMENT | typeof DECREMENT;
  payload: number;
}

const counterReducer = (
  state: CounterState = initialState,
  action: Actions
) => {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + action.payload };
    case DECREMENT:
      return { ...state, count: state.count - action.payload };
    default:
      return state;
  }
};

export default counterReducer;

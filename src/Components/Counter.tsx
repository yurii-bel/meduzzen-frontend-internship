import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Store/index";
import { Dispatch } from "redux";
import { Actions } from "../Store/counterReducer";
import { increment, decrement } from "../Store/counterReducer"; // import the functions from counterReducer.ts

const Counter = () => {
  const count = useSelector((state: RootState) => state.counter.count);
  const dispatch = useDispatch<Dispatch<Actions>>();

  const handleIncrement = () => {
    dispatch(increment(1)); // use the imported increment function
  };

  const handleDecrement = () => {
    dispatch(decrement(1)); // use the imported decrement function
  };

  return (
    <div className="flex flex-col bg-gray-800 mt-4 rounded-md text-white p-4">
      <span className="text-sm italic text-gray-300">Redux Counter</span>
      <p className="text-center text-lg">Count: {count}</p>
      <div className="flex gap-4 mt-4 justify-center">
        <button
          className="border-2 border-green-700 rounded-sm px-2 hover:bg-green-800"
          onClick={handleIncrement}
        >
          Increment
        </button>
        <button
          className="border-2 border-red-700 rounded-sm px-2 hover:bg-red-800"
          onClick={handleDecrement}
        >
          Decrement
        </button>
      </div>
    </div>
  );
};

export default Counter;

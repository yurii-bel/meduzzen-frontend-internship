import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers/index";

const Counter = () => {
  const count = useSelector((state: RootState) => state.counter.count);
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch({ type: "INCREMENT" });
  };

  const handleDecrement = () => {
    dispatch({ type: "DECREMENT" });
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

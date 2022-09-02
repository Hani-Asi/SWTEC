import Text from "../Text";
import useTimeout from "../../hooks/useTimeout";

const ToastItem = ({ id, message, duration, onDone }) => {
  useTimeout(() => {
    onDone();
  }, duration);

  return (
    <div>
      <Text>{message}</Text>
    </div>
  );
};

export default ToastItem;

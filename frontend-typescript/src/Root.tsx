import { useSelector } from "react-redux";
import App from "./routes/App";
import Login from "./routes/Login";
import { RootState } from "./store";

const Root = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  return currentUser ? <App /> : <Login />;
};

export default Root;

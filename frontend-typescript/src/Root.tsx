import { useSelector } from "react-redux";
import App from "./routes/App";
import Login from "./routes/Login";
import { RootState } from "./store";

const Root = () => {
  const currentUser = useSelector((state: RootState) => state.currentUser);
  return currentUser.name !== "" ? <App /> : <Login />;
};

export default Root;

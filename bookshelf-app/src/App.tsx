import { LoginForm } from "./components/LoginForm";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import SearchBar from "./components/Books";

function App() {
  const isUserSigned = useSelector(
    (state: RootState) => state.user.isUserSigned
  );

  return (
    <div className="container">
      {!isUserSigned && <LoginForm />}
      {isUserSigned && (
        <>
          <SearchBar />
        </>
      )}
    </div>
  );
}

export default App;

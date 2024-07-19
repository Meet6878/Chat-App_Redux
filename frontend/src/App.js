import HomePage from "./components/HomePage";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import PageNotFound from "./components/PagenotFound";
import Register from "./components/Register";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/homepage" element={<HomePage />} />
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import OrderDetails from "./pages/OrderDetails";
import { useEffect } from "react";
import { authUser } from "./utils/api";

function App() {
  useEffect(() => {
    authUser();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/order/:orderId" element={<OrderDetails />} />
      </Routes>
    </>
  );
}

export default App;

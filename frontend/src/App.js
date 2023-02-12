import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./cart/Cart";
import CheckoutSuccess from "./checkout/CheckoutSuccess";
import NotFound from "./not-found/NotFound";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/cart">
            <Route index element={<Cart />} />
          </Route>
          <Route path="/checkout-success">
            <Route index element={<CheckoutSuccess />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

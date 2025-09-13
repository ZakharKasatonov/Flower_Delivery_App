import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import SideBar from "./components/SideBar/SideBar";
import FlowerItems from "./components/FlowerItems/FlowerItems";
import Checkout from "./pages/Checkout";
import { useState } from "react";
import { CartProvider } from "./context/CartProvider";
import "./App.scss";
function App() {
  const [activeShopId, setActiveShopId] = useState<number | null>(null);

  return (
    <CartProvider>
      <BrowserRouter>
        <div className="app">
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <main className="main">
                  <FlowerItems activeShopId={activeShopId} />
                  <SideBar
                    activeShopId={activeShopId}
                    setActiveShopId={setActiveShopId}
                  />
                </main>
              }
            />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}
export default App;

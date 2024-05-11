import React, { useState } from "react";
import Topbar from "../Components/navigation/Topbar";
import Footer from "../Components/navigation/Footer";
import CartNavBar from "../Components/Cart/CartNavBar";
import Cart from "../Components/Cart/Cart";
import Order from "../Components/Order/Order";

const Cartpage: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col min-h-screen bg-light_bg dark:bg-dark_bg">
      <Topbar />
      <div className="flex w-full px-44 bg-light_bg2 dark:bg-dark_bg2 border-b-2 border-light_border dark:border-dark_border z-40 sticky top-16 mb-12">
        <CartNavBar activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
      </div>
      {activeIndex === 0 && (
        <div className="flex h-full flex-grow px-44">
          <Cart />
        </div>
      )}
      {activeIndex === 1 && (
        <div className="flex h-full flex-grow px-44">
          <Order />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Cartpage;

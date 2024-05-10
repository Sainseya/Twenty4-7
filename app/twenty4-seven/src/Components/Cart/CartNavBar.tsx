import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";

interface CartNavBarProps {
    setActiveIndex: (index: number) => void;
    activeIndex: number;
  }

const CartNavBar: React.FC<CartNavBarProps> = ({ setActiveIndex, activeIndex }) => {
  return (
    <div className="h-16 flex items-center text-lg font-semibold gap-5">
      <div>
        <RxHamburgerMenu
          size={32}
          className="text-txtBlack dark:text-txtWhite"
        />
      </div>
      <div className="relative flex h-full">
      <button
        className="flex items-center justify-center w-28 text-txtBlack dark:text-txtWhite hover:text-txtGreen"
        onClick={() => setActiveIndex(0)}
      >
        Cart
      </button>
      <button
        className="relative flex items-center justify-center w-28 text-txtBlack dark:text-txtWhite hover:text-txtGreen"
        onClick={() => setActiveIndex(1)}
      >
        Orders
      </button>
      <div
        className={`bottom-0 h-1 absolute px-2 left-0 w-28 transition-transform duration-300 ease-in-out`}
        style={{ transform: `translateX(calc(${activeIndex} * 112px))` }}
        data-testid="active-indicator"
      >
        <div className="w-full h-full rounded-t bg-greenButton"></div>
      </div>
      </div>
    </div>
  );
};

export default CartNavBar;

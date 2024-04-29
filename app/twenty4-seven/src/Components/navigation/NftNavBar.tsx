import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

const NftNavBar: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleButtonClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="h-16 w-full flex items-center gap-5">
      <button type="button">
        <RxHamburgerMenu
          size={32}
          className="text-txtBlack dark:text-txtWhite"
        />
      </button>
      <div className="relative flex h-full">
        <button
          className={`flex items-center justify-center w-28 text-txtBlack dark:text-txtWhite hover:text-txtGreen ${
            activeIndex === 0
          }`}
          onClick={() => handleButtonClick(0)}
        >
          Items
        </button>
        <button
          className={`relative flex items-center justify-center w-28 text-txtBlack dark:text-txtWhite hover:text-txtGreen ${
            activeIndex === 1
          }`}
          onClick={() => handleButtonClick(1)}
        >
          Market
          <div className="absolute top-3 right-0 px-1 rounded text-xs bg-light_badge dark:bg-dark_badge text-black dark:text-txtPurple">
            <span className="uppercase font-bold text-[10px]">Beta</span>
          </div>
        </button>
        <button
          className={`flex items-center justify-center w-28 text-txtBlack dark:text-txtWhite hover:text-txtGreen ${
            activeIndex === 2
          }`}
          onClick={() => handleButtonClick(2)}
        >
          News
        </button>
        <div
          className="bottom-0 h-1 absolute px-2 w-28 left-0 transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(calc(${activeIndex} * 112px))` }}
        >
          <div className="w-full h-full rounded-t bg-greenButton"></div>
        </div>
      </div>
    </div>
  );
};

export default NftNavBar;

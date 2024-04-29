import { useState } from "react";
import { IoIosSunny } from "react-icons/io";
import { FaCartShopping, FaUser } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";


const Topbar: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
    const html = document.documentElement;
    html.classList.toggle('dark');
  };

  return (
    <div id="topbar" className="flex w-full h-16 bg-light_bg dark:bg-dark_bg justify-between items-center">
      <div className="w-64 px-8">
        <h2 className="font-semibold text-txtBlack dark:text-txtWhite">Twenty4/7</h2>
      </div>
      <div className="flex flex-1 px-32 justify-center items-center">
        <div
          id="Search"
          className="w-full h-11 bg-light_txtZone dark:bg-dark_txtZone rounded-xl flex items-center pl-4"
        >
          <FaSearch size={24} color="#939aa6" />
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 w-full bg-transparent focus:outline-none focus:ring-0 border-none"
          />
        </div>
      </div>
      <div className="flex w-64 justify-around">
        <button type="button" id="themeToggle" onClick={handleThemeToggle} data-testid="theme-icon">
          <IoIosSunny size={32} className="text-txtBlack dark:text-txtWhite" />
        </button>
        <button type="button" data-testid="cart-icon">
          <FaCartShopping size={32} className="text-txtBlack dark:text-txtWhite" />
        </button>
        <Link to="/connexion">{/* //! Tempo */}
          <button type="button" data-testid="user-icon">
            <FaUser size={32} className="text-txtBlack dark:text-txtWhite" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
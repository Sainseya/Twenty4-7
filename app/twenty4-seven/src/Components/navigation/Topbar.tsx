import { useEffect, useState } from "react";
import { FaCartShopping, FaUser } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import CartDropdown from "../Cart/CartDropdown";
import UserDropdown from "../User/UserDropdown";
import { ReactComponent as LogoDark } from "../../Assets/LogoWebDark.svg";
import { ReactComponent as LogoLight } from "../../Assets/LogoWebLight.svg";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { isPageValid } from "../../Utils/ValidePages";
import { useTheme } from "../../Utils/ThemeContext";

const Topbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [darkMode, setDarkMode] = useState(false);
  const [isDropdownCartOpen, setIsDropdownCartOpen] = useState(false);
  const [isDropdownUserOpen, setIsDropdownUserOpen] = useState(false);
  const LogoComponent = theme === "dark" ? LogoDark : LogoLight;

  let navigate = useNavigate();

  const isUserLogin = localStorage.getItem("token") ? true : false;

  const toggleDropdownCart = () => {
    setIsDropdownCartOpen(!isDropdownCartOpen);
    setIsDropdownUserOpen(false);
  };

  const toggleDropdownUser = () => {
    if(!isUserLogin) {
      navigateToPage("connexion");
    }
    setIsDropdownUserOpen(!isDropdownUserOpen);
    setIsDropdownCartOpen(false);
  };

  const navigateToPage = (page: string) => {
    if (isPageValid(page)) {
      navigate(`/${page.toLowerCase()}`);
    } else {
      navigate("/404");
    }
    window.scrollTo(0, 0);
  };

  const handleThemeToggle = () => {
    toggleTheme();
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (theme === "dark") {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, [theme]);

  return (
    <div
      id="topbar"
      className="flex w-full h-16 border-b-2 border-light_border dark:border-dark_border bg-light_bg dark:bg-dark_bg justify-between items-center z-50 sticky top-0"
    >
      <div className="w-64 px-8 pt-1">
        <motion.button
          whileHover={{ scale: 1.05 }}
          type="button"
          className="flex items-center font-semibold text-txtBlack dark:text-txtWhite"
          onClick={() => navigateToPage("")}
        >
          <LogoComponent
            style={{ width: "48px", height: "48px" }}
            data-testid="logo"
          />
          <span className="font-semibold pl-2 text-txtBlack dark:text-txtWhite">
            Twenty4/7
          </span>
        </motion.button>
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
            className="px-4 py-2 w-full bg-transparent focus:outline-none focus:ring-0 border-none text-txtBlack dark:text-txtWhite"
          />
        </div>
      </div>
      <div className="flex w-64 justify-around" data-testid="theme-icon">
        <DarkModeSwitch
          onChange={handleThemeToggle}
          checked={darkMode}
          size={32}
          moonColor="white"
          sunColor="black"
        />
        <button
          type="button"
          data-testid="cart-icon"
          className="relative"
          onClick={toggleDropdownCart}
        >
          <FaCartShopping
            size={32}
            className="text-txtBlack dark:text-txtWhite"
          />
          <CartDropdown
            isDropdownOpen={isDropdownCartOpen}
            itemsInCart={1}
            closeDropdown={() => setIsDropdownCartOpen(false)}
          />
        </button>

        <button
          type="button"
          data-testid="user-icon"
          onClick={toggleDropdownUser}
        >
          <FaUser size={32} className="text-txtBlack dark:text-txtWhite" />
          {isUserLogin && (
            <UserDropdown
              isDropdownOpen={isDropdownUserOpen}
              closeDropdown={() => setIsDropdownUserOpen(false)}
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default Topbar;

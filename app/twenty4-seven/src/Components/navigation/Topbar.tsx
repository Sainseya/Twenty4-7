import { useState, useEffect } from "react";
import { FaCartShopping, FaUser } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CartDropdown from "../Cart/CartDropdown";
import { ReactComponent as LogoDark } from "../../Assets/LogoWebDark.svg";
import { ReactComponent as LogoLight } from "../../Assets/LogoWebLight.svg";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { isPageValid } from "../../Utils/ValidePages";

const Topbar: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isDarkMode = document.documentElement.classList.contains("dark");
  const LogoComponent = isDarkMode ? LogoDark : LogoLight;

  let navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const navigateToPage = (page: string) => {
    if(isPageValid(page)) {
      navigate(`/${page.toLowerCase()}`);
    } else {
      navigate("/404");
    }
    window.scrollTo(0, 0);
  };

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("theme", !darkMode ? "dark" : "light");

    const html = document.documentElement;
    html.classList.toggle("dark");
  };

  //? Load theme from local storage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <div
      id="topbar"
      className="flex w-full h-16 border-b-2 border-light_border dark:border-dark_border bg-light_bg dark:bg-dark_bg justify-between items-center z-50 sticky top-0"
    >
      <div className="w-64 px-8 pt-1">
        <button
          type="button"
          className="flex items-center font-semibold text-txtBlack dark:text-txtWhite"
          onClick={() => navigateToPage("")}
        >
          <LogoComponent style={{ width: "48px", height: "48px" }} data-testid="logo"/>
          <span className="font-semibold pl-2 text-txtBlack dark:text-txtWhite">
            Twenty4/7
          </span>
        </button>
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
          onClick={toggleDropdown}
        >
          <FaCartShopping
            size={32}
            className="text-txtBlack dark:text-txtWhite"
          />
          <CartDropdown
            isDropdownOpen={isDropdownOpen}
            itemsInCart={0}
            closeDropdown={() => setIsDropdownOpen(false)}
          />
        </button>

        <button
          type="button"
          data-testid="user-icon"
          onClick={() => navigateToPage("connexion")}
        >
          <FaUser size={32} className="text-txtBlack dark:text-txtWhite" />
        </button>
      </div>
    </div>
  );
};

export default Topbar;

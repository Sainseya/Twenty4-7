import { useState } from "react";
import { IoIosSunny } from "react-icons/io";
import { FaCartShopping, FaUser } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface TopbarProps {
  itemsInCart?: number;
}

const Topbar: React.FC<TopbarProps> = ({ itemsInCart = 2 }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  let navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const deleteItemInCart = (index: number) => {
    console.log("deleteItem n° : " + index);
  }

  const navigateToUser = () => {
    navigate("/connexion");
  };

  const navigateToHome = () => {
    navigate("/");
  };

  const navigateToCart = () => {
    console.log("Go to shopping cart");
    setIsDropdownOpen(!isDropdownOpen);
    //navigate("/shoppingcart");
  }

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
    const html = document.documentElement;
    html.classList.toggle("dark");
  };

  return (
    <div
      id="topbar"
      className="flex w-full h-16 bg-light_bg dark:bg-dark_bg justify-between items-center"
    >
      <div className="w-64 px-8">
        <button
          type="button"
          className="font-semibold text-txtBlack dark:text-txtWhite"
          onClick={navigateToHome}
        >
          Twenty4/7
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
      <div className="flex w-64 justify-around">
        <button
          type="button"
          id="themeToggle"
          onClick={handleThemeToggle}
          data-testid="theme-icon"
        >
          <IoIosSunny size={32} className="text-txtBlack dark:text-txtWhite" />
        </button>
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
          {itemsInCart > 0 && (
            <div className="absolute -top-2 -right-2 px-1 rounded-full text-sm bg-light_badge2 dark:bg-dark_badge2 text-txtBlack dark:text-txtGreen">
              <span className="uppercase font-bold text-[10px]">
                {itemsInCart}
              </span>
            </div>
          )}
          {isDropdownOpen && (
            <div className="absolute top-10 -right-2 w-64 max-h-48 z-20 rounded-xl bg-light_bg border border-light_border dark:bg-dark_bg2 dark:border-dark_border shadow-md"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {itemsInCart > 0 ? (
                // Afficher les éléments du panier ici
                <>
                  <button
                    type="button"
                    className="px-4 py-2 mt-2 rounded-xl bg-purpleButton text-txtWhite font-semibold"
                    onClick={navigateToCart}
                  >
                    Go to cart
                  </button>
                  {Array.from({ length: itemsInCart }).map((_, index) => (
                    <div
                      key={index}
                      className="relative flex w-full h-16 items-center px-2"
                    >
                      <div className="h-8 w-8 bg-slate-300 rounded-lg"></div>
                      <p className="flex flex-1 p-2 text-left text-txtBlack dark:text-txtWhite">
                        Name
                      </p>
                      <button
                        type="button"
                        className="h-6 w-6 px-1 rounded-full text-sm border border-red-800 bg-red-600 font-semibold text-txtWhite text-center text-[10px]"
                        onClick={() => deleteItemInCart(index)}
                      >
                        X
                      </button>
                      {index !== itemsInCart - 1 && (
                        <span className="absolute left-1/2 transform -translate-x-1/2 w-60 h-[2px] bottom-0 rounded bg-light_border dark:bg-dark_border"></span>
                      )}
                    </div>
                  ))}
                </>
              ) : (
                <p className="text-center p-2 text-txtBlack dark:text-txtWhite">
                  Empty Cart
                </p>
              )}
            </div>
          )}
        </button>

        <button type="button" data-testid="user-icon" onClick={navigateToUser}>
          <FaUser size={32} className="text-txtBlack dark:text-txtWhite" />
        </button>
      </div>
    </div>
  );
};

export default Topbar;

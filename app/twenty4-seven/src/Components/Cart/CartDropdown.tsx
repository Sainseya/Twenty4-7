import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { isPageValid } from "../../Utils/ValidePages";

interface CartDropdownProps {
  itemsInCart?: number;
  isDropdownOpen: boolean;
  closeDropdown: () => void;
}

const CartDropdown: React.FC<CartDropdownProps> = ({
  itemsInCart = 0,
  isDropdownOpen,
  closeDropdown,
}) => {
  let navigate = useNavigate();

  const navigateToCart = (page: string) => {
    closeDropdown();
    if (isPageValid(page)) {
      navigate(`/${page.toLowerCase()}`);
    } else {
      navigate("/404");
    }
  };

  const deleteItemInCart = (index: number) => {
    console.log("deleteItem n° : " + index);
  };

  return (
    <>
      {itemsInCart > 0 && (
        <div className="absolute -top-2 -right-2 px-1 rounded-full text-sm bg-light_badge2 dark:bg-dark_badge2 text-txtBlack dark:text-txtGreen">
          <span className="uppercase font-bold text-[10px]">{itemsInCart}</span>
        </div>
      )}
      {isDropdownOpen && (
        <div
          className="absolute top-10 -right-2 w-64 max-h-64 z-20 rounded-xl bg-light_bg border border-light_border dark:bg-dark_bg2 dark:border-dark_border shadow-md overflow-y-auto overflow-x-hidden"
          onClick={(e) => {
            e.stopPropagation();
          }}
          data-testid="cart-dropdown"
        >
          {itemsInCart > 0 ? (
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                type="button"
                className="px-4 py-2 my-2 rounded-xl bg-purpleButton text-txtWhite text-sm font-semibold relative"
                onClick={() => navigateToCart("cart")}
                data-testid="go to cart"
              >
                Go to cart
              </motion.button>

              {Array.from({ length: itemsInCart }).map((_, index) => (
                <div
                  key={index}
                  className="relative flex w-full h-16 items-center px-2"
                  data-testid="item"
                >
                  <img
                    className="size-10 rounded-lg"
                    //! Placeholder
                    src="https://placehold.co/512?text=Item"
                    alt="Product"
                  />
                  <p className="flex flex-1 p-2 text-left text-txtBlack dark:text-txtWhite">
                    Name
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    type="button"
                    className="h-6 w-6 px-1 rounded-full text-sm  font-bold text-red-600 text-center text-[10px]"
                    onClick={() => deleteItemInCart(index)}
                    data-testid="deleteBtn"
                  >
                    <FaRegTrashAlt size={20} />
                  </motion.button>
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
    </>
  );
};

export default CartDropdown;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isPageValid } from "../../Utils/ValidePages";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import UserInfoModal from "./UserInfoModal";

interface UserDropdownProps {
  isDropdownOpen: boolean;
  closeDropdown: () => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({
  isDropdownOpen,
  closeDropdown,
}) => {
  let navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModalInfo = () => {
    setModalOpen(!isModalOpen);
  };

  const navigateToLink = (page: string) => {
    if (page === "connexion" && localStorage.getItem("token")) {
      localStorage.removeItem("token");
      console.log("Token Remove");
    }

    closeDropdown();
    if (isPageValid(page)) {
      navigate(`/${page.toLowerCase()}`);
    } else {
      navigate("/404");
    }
  };

  return (
    <>
      {isDropdownOpen && (
        <div
          className="absolute top-14 right-1 h-fit z-20 rounded-xl bg-light_bg border border-light_border dark:bg-dark_bg2 dark:border-dark_border shadow-md"
          onClick={(e) => {
            e.stopPropagation();
          }}
          data-testid="user-dropdown"
        >
          <div className="relative flex flex-col w-full py-2 px-6 items-center gap-2">
            <button
              type="button"
              className="flex h-6 w-full flex-row justify-center items-center gap-4"
              onClick={toggleModalInfo}
            >
              <FaUser size={18} className="dark:text-txtWhite" />
              <div className="flex-1 text-right dark:text-txtWhite">
                Account
              </div>
            </button>
            <button
              type="button"
              className="flex h-6 mb-1 w-full flex-row justify-center items-center gap-4"
              onClick={() => navigateToLink("cart")}
            >
              <FaShoppingCart size={18} className="dark:text-txtWhite" />
              <div className="flex-1 text-right dark:text-txtWhite">Orders</div>
            </button>
            <span className="absolute bottom-9 w-full h-[2px] rounded bg-light_border dark:bg-dark_border"></span>
            <button
              type="button"
              className="flex h-6 w-full flex-row justify-center items-center gap-4"
              onClick={() => navigateToLink("connexion")}
            >
              <ImExit size={18} className="dark:text-txtWhite ml-1" />
              <div className="flex-1 text-right dark:text-txtWhite">
                Log Out
              </div>
            </button>
          </div>
        </div>
      )}
      {isModalOpen && <UserInfoModal closeModal={toggleModalInfo} />}
    </>
  );
};

export default UserDropdown;

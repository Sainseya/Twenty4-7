import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ReactComponent as LogoDark } from "../../Assets/LogoWebDark.svg";
import { ReactComponent as LogoLight } from "../../Assets/LogoWebLight.svg";
import { useTheme } from "../../Utils/ThemeContext";
import { isPageValid } from "../../Utils/ValidePages";

const Footer: React.FC = () => {
  const { theme } = useTheme();
  const LogoComponent = theme === 'dark' ? LogoDark : LogoLight;

  let navigate = useNavigate();

  const goToPage = (page: string) => {
    if(isPageValid(page)) {
      navigate(`/${page.toLowerCase()}`);
    } else {
      navigate("/404");
    }
    window.scrollTo(0, 0);
  };

  return (
    <div
      id="footer"
      className="px-44 divide-y divide-light_border dark:divide-dark_border bg-light_bg2 dark:bg-dark_bg2 border-t-2 border-light_border dark:border-dark_border z-50"
    >
      <div className="flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0 ">
        <div className="lg:w-1/3">
          <div
            rel="noopener noreferrer"
            className="flex justify-center space-x-3 lg:justify-start"
          >
            <div className="flex items-center justify-center w-12 h-12">
              <LogoComponent style={{ width: "48px", height: "48px" }} />
            </div>
            <span className="self-center text-2xl font-semibold dark:text-txtWhite">
              Twenty4/7
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4">
          <div className="space-y-3">
            <h3 className="tracking-wide uppercase dark:text-txtWhite font-semibold">
              Product
            </h3>
            <ul className="space-y-1 text-txtPlaceholder">
              <li>
                <button
                  type="button"
                  onClick={() => goToPage("")}
                  className="cursor-pointer"
                >
                  Category
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => goToPage("nft")}
                  className="cursor-pointer"
                >
                  NFT
                </button>
              </li>
              <li>
                <button type="button" onClick={() => goToPage("bathwater")} className="cursor-pointer">Bathwater</button>
              </li>
              <li>
                <button type="button" onClick={() => goToPage("courses")} className="cursor-pointer">Courses</button>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="tracking-wide uppercase dark:text-txtWhite font-semibold">
              Company
            </h3>
            <ul className="space-y-1 text-txtPlaceholder">
              <li>
                <button type="button" className="cursor-default">Privacy</button>
              </li>
              <li>
                <button type="button" className="cursor-default">Terms of Service</button>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="uppercase dark:text-txtWhite font-semibold">
              Developers
            </h3>
            <ul className="space-y-1 text-txtPlaceholder">
              <li>
                <a rel="noopener noreferrer" target="_blank" href="https://github.com/EpitechMscProPromo2026/T-WEB-600-LIL_13">Project</a>
              </li>
              <li>
                <a rel="noopener noreferrer" target="_blank" href="https://github.com/EpitechMscProPromo2026/T-WEB-600-LIL_13">Documentation</a>
              </li>
              <li>
                <a rel="noopener noreferrer" target="_blank" href="https://coinmarketcap.com/api/documentation/v1/">External API</a>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <div className="uppercase dark:text-txtWhite font-semibold">
              Social media
            </div>
            <div className="flex justify-start space-x-3">
              <motion.a
                whileHover={{ y: -3.0 }}
                rel="noopener noreferrer"
                target="_blank"
                title="Facebook"
                href="https://www.facebook.com/"
                className="flex items-center p-1"
              >
                <FaFacebook size={24} className="dark:text-txtWhite" />
              </motion.a>
              <motion.a
                whileHover={{ y: -3.0 }}
                rel="noopener noreferrer"
                target="_blank"
                title="XTwitter"
                href="https://twitter.com/"
                className="flex items-center p-1"
              >
                <FaXTwitter size={24} className="dark:text-txtWhite" />
              </motion.a>
              <motion.a
                whileHover={{ y: -3.0 }}
                rel="noopener noreferrer"
                target="_blank"
                title="Instagram"
                href="https://www.instagram.com/"
                className="flex items-center p-1"
              >
                <FaInstagram size={24} className="dark:text-txtWhite" />
              </motion.a>
            </div>
          </div>
        </div>
      </div>
      <div className="py-6 text-sm text-center dark:text-txtPlaceholder">
        © 2024 Twenty4/7 Company. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;

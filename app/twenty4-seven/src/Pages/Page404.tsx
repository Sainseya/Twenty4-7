import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../CSS/Blob404Style.css"

const Page404 = () => {
  let navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/");
    window.scrollTo(0, 0);
  };

  return (
    <div className="containerBlob">
      <div className="blob-c">
        <div className="shape-blob"></div>
        <div className="shape-blob one"></div>
        <div className="shape-blob two"></div>
        <div className="shape-blob three"></div>
        <div className="shape-blob four"></div>
        <div className="shape-blob five"></div>
        <div className="shape-blob six"></div>
      </div>

      <div className=" z-10 w-9/12 m-auto py-16 min-h-screen flex items-center justify-center">
        <div className="bg-light_bg dark:bg-dark_txtZone shadow-md overflow-hidden sm:rounded-lg pb-8">
          <div className="border-t border-light_border dark:border-dark_border rounded-t-lg text-center pt-8">
            <h1 className="text-8xl font-bold text-dark_txtBadge">404</h1>
            <h1 className="text-4xl font-medium py-8 dark:text-txtWhite">
              oops! Page not found
            </h1>
            <p className="text-2xl pb-8 px-12 font-medium dark:text-txtWhite">
              Oops! The page you are looking for does not exist. It might have
              been moved or deleted.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-tr from-[#9945FF] to-[#14F195] hover:from-[#9945eF] hover:to-[#14F165] text-white font-semibold px-6 py-3 rounded-md mr-6"
              onClick={navigateToHome}
            >
              HOME
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page404;

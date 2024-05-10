import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-light_bg2 dark:bg-dark_bg2 bg-opacity-5 backdrop-blur-md z-40">
      <div className="border-8 border-gray-300 border-t-blue-500 rounded-full w-20 h-20 animate-spin"></div>
    </div>
  );
};

export default Loader;
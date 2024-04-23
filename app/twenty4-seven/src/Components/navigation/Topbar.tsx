import { IoIosSunny } from "react-icons/io";
import { FaCartShopping, FaUser } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

interface TopbarProps {
  nameWebsite: string;
}

const Topbar: React.FC<TopbarProps> = ({ nameWebsite }) => {
  return (
    <div className="flex w-full h-16 bg-light_bg justify-between items-center">
      <div className="w-64 px-8">
        <h2 className="font-semibold">{nameWebsite}</h2>
      </div>
      <div className="flex flex-1 px-2 justify-center items-center">
        <div
          id="Search"
          className="w-full h-11 bg-light_txtZone rounded-xl flex items-center pl-4"
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
        <button type="button" className="">
          <IoIosSunny size={32} />
        </button>
        <button type="button" className="">
          <FaCartShopping size={32} />
        </button>
        <Link to="/connexion">{/* //! Tempo */}
          <button type="button" className="">
            <FaUser size={32} />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
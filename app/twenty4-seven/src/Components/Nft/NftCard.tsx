import React from "react";
import { FaCartShopping } from "react-icons/fa6";
import { ReactComponent as SolanaLogo } from "../../Assets/solanaLogoMark.svg";
import NftImage from "../../Assets/NFT/Dirt Block.png";
import { motion } from "framer-motion";

interface NftCardProps {
  price: number;
  idCard: number;
}

const NftCard: React.FC<NftCardProps> = ({ price, idCard }) => {
  const addNftToCart = () => {
    console.log("NFT id : " + idCard + " added to cart");
  };

  const showDetails = (idCard: number) => {
    console.log("Details of NFT n° " + idCard);
  };

  return (
    <div className="flex flex-col h-80 w-64 items-center bg-light_bg dark:bg-dark_bg2 rounded-xl border-2 border-light_border dark:border-dark_border">
      <div className="h-56 w-56 mt-4 bg-light_border dark:bg-dark_border rounded-xl ">
        <motion.img
          whileHover={{ scale: 1.05 }}
          src={NftImage}
          alt="nftImg"
          className="rounded-xl"
        ></motion.img>
      </div>
      <div className="flex-1 flex flex-col justify-between w-full h-8 px-4 bg-light_card dark:bg-dark_bg2 rounded-b-lg">
        <div className="flex items-center gap-2 font-semibold pt-2">
          <span className="text-txtBlack dark:text-txtWhite">{price}</span>
          <SolanaLogo style={{ width: "18px", height: "18px" }} />
        </div>
        <div className="flex gap-4 pb-3">
          <div className="flex-1"></div>
          <button
            type="button"
            className="h-8 px-4 border-2 border-purpleButton rounded-lg text-sm font-medium text-txtPurple"
            onClick={() => showDetails(idCard)}
          >
            Details
          </button>
          <button
            type="button"
            className="flex items-center justify-center h-8 w-8 bg-purpleButton rounded-lg p-1"
            onClick={addNftToCart}
            data-testid="add to cart"
          >
            <FaCartShopping size={20} className="text-txtWhite" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NftCard;

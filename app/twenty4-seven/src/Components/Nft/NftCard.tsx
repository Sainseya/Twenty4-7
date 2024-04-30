import React from "react";
import { FaCartShopping } from "react-icons/fa6";
import { ReactComponent as SolanaLogo } from "../../Assets/solanaLogoMark.svg";

interface NftCardProps {
  price?: number;
  idCard?: number;
}

const NftCard: React.FC<NftCardProps> = ({ price, idCard }) => {
  let thisIdCard = idCard;

  const addNftToCart = () => {
    console.log("NFT id : " + thisIdCard + " added to cart");
  };

  return (
    <div className="flex flex-col h-80 w-64 items-center bg-light_bg dark:bg-dark_bg2 rounded-xl border-2 border-light_border dark:border-dark_border">
      <div className="h-52 w-52 my-4 bg-light_border dark:bg-dark_border rounded-xl"></div>
      <div className="flex-1 flex flex-col justify-between w-full h-8 p-2 bg-light_card dark:bg-dark_bg2 rounded-b-lg">
        <div className="flex items-center gap-2 font-semibold">
          <span className="text-txtBlack dark:text-txtWhite">{price}</span>
          <SolanaLogo style={{ width: "18px", height: "18px" }} />
        </div>
        <div className="flex">
          <div className="flex-1 text-txtBlack dark:text-txtWhite">
            "trading"
          </div>
          <button
            type="button"
            className="flex items-center justify-center h-8 w-8 bg-purpleButton rounded-lg p-1"
            onClick={addNftToCart}
          >
            <FaCartShopping size={20} className="text-txtWhite" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NftCard;

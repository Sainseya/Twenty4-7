import React from "react";
import { ReactComponent as SolanaLogo } from "../../Assets/solanaLogoMark.svg";
import { motion } from "framer-motion";
import { FaRegTrashAlt } from "react-icons/fa";
import { capitalizeWords } from "../../Utils/Tools";

interface ProductInCartProps {
  productName: string;
  quantity?: number;
  price: number;
  isNft?: boolean;
}

const ProductInCart: React.FC<ProductInCartProps> = ({
  productName,
  quantity = 1,
  price,
  isNft = false,
}) => {
  return (
    <tr>
      <td className="py-4 flex-1">
        <div className="flex items-center">
          <img
            className="h-20 w-20 mr-4 rounded-lg"
            //! Placeholder
            src="https://placehold.co/512?text=Product"
            alt="Product"
          />
          <span className="font-semibold dark:text-txtWhite">
            {capitalizeWords(productName)}
          </span>
        </div>
      </td>
      <td className="py-4 text-center dark:text-txtWhite">{quantity}</td>
      <td className="py-4 text-center dark:text-txtWhite">
        <span className="flex justify-center items-center gap-2">
          {price}
          {isNft ? (
            <SolanaLogo style={{ width: "18px", height: "18px" }} data-testid="solana-logo" />
          ) : (
            <span>$</span>
          )}
        </span>
      </td>
      <td className="py-4 h-28 flex items-center justify-center text-red-600">
        <motion.button whileHover={{ scale: 1.1 }} type="button">
          <FaRegTrashAlt size={22} />
        </motion.button>
      </td>
    </tr>
  );
};

export default ProductInCart;

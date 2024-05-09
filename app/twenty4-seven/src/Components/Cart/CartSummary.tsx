import React from "react";
import { ReactComponent as SolanaLogo } from "../../Assets/solanaLogoMark.svg";
import { motion } from "framer-motion";

interface CartSummaryProps {
  subtotalPrice: number;
  taxe?: number;
  shippingPrice?: number;
  allNft?: boolean;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  subtotalPrice,
  taxe = 0,
  shippingPrice = 0,
  allNft: haveNft = false,
}) => {
  const totalPrice = (subtotalPrice + taxe + shippingPrice).toFixed(2);

  return (
    <div className="w-1/4">
      <div className="bg-light_bg dark:bg-dark_bg2 border-2 border-light_border dark:border-dark_border rounded-lg shadow-md p-6 sticky top-44">
        <div className="text-lg font-semibold mb-4 dark:text-txtWhite">
          Summary
        </div>
        <div className="flex justify-between mb-2">
          <span className="dark:text-txtWhite">Subtotal</span>
          <span className="flex items-center gap-2 dark:text-txtWhite">
            {haveNft ? (
              <>
                {subtotalPrice}
                <SolanaLogo style={{ width: "18px", height: "18px" }} />
              </>
            ) : (
              <>${subtotalPrice}</>
            )}
          </span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="dark:text-txtWhite">Taxes</span>
          <span className="flex items-center gap-2 dark:text-txtWhite">
            {haveNft ? (
              <>
                {taxe}
                <SolanaLogo style={{ width: "18px", height: "18px" }} />
              </>
            ) : (
              <>${taxe}</>
            )}
          </span>
        </div>
        <div className="flex justify-between mb-2">
          {haveNft ? (
            <></>
          ) : (
            <>
              <span className="dark:text-txtWhite">Shipping</span>
              <span className="flex items-center gap-2 dark:text-txtWhite">
                ${shippingPrice}
              </span>
            </>
          )}
        </div>
        <hr className="my-4" />
        <div className="flex justify-between mb-2">
          <span className="font-semibold dark:text-txtWhite">Total</span>
          <span className="flex items-center gap-2 font-semibold dark:text-txtWhite">
            {haveNft ? (
              <>
                {totalPrice}
                <SolanaLogo style={{ width: "18px", height: "18px" }} />
              </>
            ) : (
              <>${totalPrice}</>
            )}
          </span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          type="button"
          className="bg-purpleButton text-txtWhite py-2 px-4 rounded-lg mt-4 w-full"
        >
          Checkout
        </motion.button>
      </div>
    </div>
  );
};

export default CartSummary;

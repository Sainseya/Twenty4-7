import React from "react";
import { ReactComponent as SolanaLogo } from "../../Assets/solanaLogoMark.svg";
import { motion } from "framer-motion";

interface CartSummaryProps {
  // cartProductData: CartProductData[];
  subtotalPriceNft: number;
  subtotalPriceOther: number;
  taxeNft?: number;
  taxeOther?: number;
  shippingPrice?: number;
  allNft?: boolean;
  haveOneNft?: boolean;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  subtotalPriceNft,
  subtotalPriceOther,
  taxeNft = 0.1,
  taxeOther = 0,
  shippingPrice = 5,
  allNft = false,
  haveOneNft = false,
  // cartProductData,
}) => {
  const totalPriceNft = (subtotalPriceNft + taxeNft).toFixed(2);
  const totalPriceOther = (subtotalPriceOther + taxeNft + shippingPrice).toFixed(2);

  return (
    <div className="w-1/4">
      <div className="bg-light_bg dark:bg-dark_bg2 border-2 border-light_border dark:border-dark_border rounded-lg shadow-md p-6 sticky top-44">
        <div className="text-lg font-semibold mb-4 dark:text-txtWhite">
          Summary
        </div>
        <div className="flex flex-col gap-2">
        <div className="flex justify-between mb-2">
          <span className="dark:text-txtWhite">Subtotal</span>
          <span className="dark:text-txtWhite">
            {haveOneNft && !allNft ? (
              <div className="flex flex-col gap-1 text-right">
                <span>{subtotalPriceOther} $</span>
                <span className="flex items-center gap-2">
                  {subtotalPriceNft}
                  <SolanaLogo style={{ width: "18px", height: "18px" }} data-testid="solana-logo" />
                </span>
              </div>
            ) : (
              <>
                {allNft ? (
                  <span className="flex items-center gap-2">
                    {subtotalPriceNft}
                    <SolanaLogo style={{ width: "18px", height: "18px" }} data-testid="solana-logo" />
                  </span>
                ) : (
                  <>{subtotalPriceOther} $</>
                )}
              </>
            )}
          </span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="dark:text-txtWhite">Tax</span>
          <span className="dark:text-txtWhite">
            {haveOneNft && !allNft ? (
              <div className="flex flex-col gap-1 text-right">
                <span>{taxeOther} $</span>
                <span className="flex items-center gap-2">
                  {taxeNft}
                  <SolanaLogo style={{ width: "18px", height: "18px" }} data-testid="solana-logo" />
                </span>
              </div>
            ) : (
              <>
                {allNft ? (
                  <span className="flex items-center gap-2">
                    {taxeNft}
                    <SolanaLogo style={{ width: "18px", height: "18px" }} data-testid="solana-logo" />
                  </span>
                ) : (
                  <>{taxeOther} $</>
                )}
              </>
            )}
          </span>
        </div>
        <div className="flex justify-between mb-2">
          {allNft ? (
            <></>
          ) : (
            <>
              <span className="dark:text-txtWhite">Shipping</span>
              <span className="flex items-center gap-2 dark:text-txtWhite">
                {shippingPrice} $
              </span>
            </>
          )}
        </div>
        </div>
        <hr className="my-4" />
        <div className="flex justify-between mb-2">
          <span className="font-semibold dark:text-txtWhite">Total</span>
          <span className="font-semibold dark:text-txtWhite">
            {haveOneNft && !allNft ? (
              <div className="flex flex-col gap-1 text-right">
                <span>{totalPriceOther} $</span>
                <span className="flex items-center gap-2">
                  {totalPriceNft}
                  <SolanaLogo style={{ width: "18px", height: "18px" }} data-testid="solana-logo" />
                </span>
              </div>
            ) : (
              <>
                {allNft ? (
                  <span className="flex items-center gap-2">
                    {totalPriceNft}
                    <SolanaLogo style={{ width: "18px", height: "18px" }} data-testid="solana-logo" />
                  </span>
                ) : (
                  <>{totalPriceOther} $</>
                )}
              </>
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

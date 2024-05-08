import React from "react";
import ProductInCart from "./ProductInCart";
import CartSummary from "./CartSummary";

const Cart: React.FC = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-3/4">
          <div className="bg-light_bg2 dark:bg-dark_bg2 rounded-lg border-2 border-light_border dark:border-dark_border p-6 mb-4">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left font-semibold dark:text-txtWhite">
                    Product
                  </th>
                  <th className="text-center font-semibold dark:text-txtWhite">
                    Quantity
                  </th>
                  <th className="text-center font-semibold dark:text-txtWhite">
                    Price
                  </th>
                  <th className="text-center font-semibold dark:text-txtWhite">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                <ProductInCart
                  productName="dirt block"
                  quantity={1}
                  price={5.3}
                  isNft={true}
                />
                <ProductInCart
                  productName="obsidians block"
                  quantity={1}
                  price={2.7}
                  isNft={true}
                />
                <ProductInCart
                  productName="punkings block"
                  quantity={1}
                  price={3.1}
                  isNft={true}
                />
              </tbody>
            </table>
          </div>
        </div>
        <CartSummary subtotalPrice={11.1} taxe={0.1} allNft={true} />
      </div>
    </div>
  );
};

export default Cart;

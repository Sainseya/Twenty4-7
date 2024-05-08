import React from "react";
import Topbar from "../Components/navigation/Topbar";
import Footer from "../Components/navigation/Footer";
import ProductInCart from "../Components/Cart/ProductInCart";
import CartSummary from "../Components/Cart/CartSummary";

const Cartpage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-light_bg dark:bg-dark_bg">
      <Topbar />
      <div className="flex h-full pt-12 pb-[180px] px-44">
        <div className="w-full px-4">
          <h1 className="text-3xl font-semibold mb-8 dark:text-txtWhite">
            Shopping Cart
          </h1>
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
                    <ProductInCart productName="dirt block" quantity={1} price={5.3} isNft={true} />
                    <ProductInCart productName="obsidians block" quantity={1} price={2.7} isNft={true} />
                    <ProductInCart productName="punkings block" quantity={1} price={3.1} isNft={true} />
                  </tbody>
                </table>
              </div>
            </div>
            <CartSummary subtotalPrice={11.1} taxe={0.1} haveNft={true} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cartpage;

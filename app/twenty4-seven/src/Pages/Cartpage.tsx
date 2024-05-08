import React, { useState } from "react";
import Topbar from "../Components/navigation/Topbar";
import Footer from "../Components/navigation/Footer";
import ProductInCart from "../Components/Cart/ProductInCart";
import CartSummary from "../Components/Cart/CartSummary";
import CartNavBar from "../Components/Cart/CartNavBar";

const Cartpage: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col min-h-screen bg-light_bg dark:bg-dark_bg">
      <Topbar />
      <div className="flex w-full px-44 bg-light_bg2 dark:bg-dark_bg2 border-b-2 border-light_border dark:border-dark_border z-40 sticky top-16 mb-12">
        <CartNavBar activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
      </div>
      {activeIndex === 0 && (
        <div className="flex h-full flex-grow px-44">
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
              <CartSummary subtotalPrice={11.1} taxe={0.1} haveNft={true} />
            </div>
          </div>
        </div>
      )}
      {activeIndex === 1 && (
        <div className="flex flex-col flex-grow w-full px-44">
        <div className="flex flex-1 w-full justify-center items-center font-semibold text-4xl text-txtBlack dark:text-txtWhite">
          Order Comming Soon
        </div>
      </div>
      )}
      <Footer />
    </div>
  );
};

export default Cartpage;

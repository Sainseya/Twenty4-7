import React from "react";
import Topbar from "../Components/navigation/Topbar";
import Footer from "../Components/navigation/Footer";
import { FaRegTrashAlt } from "react-icons/fa";
import { ReactComponent as SolanaLogo } from "../Assets/solanaLogoMark.svg";

const Cartpage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-light_bg dark:bg-dark_bg">
      <Topbar />
      <div className="flex h-full py-32 px-44">
        <div className="container mx-auto px-4">
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
                    <tr>
                      <td className="py-4 flex-1">
                        <div className="flex items-center">
                          <img
                            className="h-20 w-20 mr-4 rounded-lg"
                            src="https://via.placeholder.com/150"
                            alt="Product image"
                          />
                          <span className="font-semibold dark:text-txtWhite">
                            Product name
                          </span>
                        </div>
                      </td>
                      <td className="py-4 text-center dark:text-txtWhite">1</td>
                      <td className="py-4 text-center dark:text-txtWhite">
                        <span className="flex justify-center items-center gap-2">
                          5.3
                          <SolanaLogo
                            style={{ width: "18px", height: "18px" }}
                          />
                        </span>
                      </td>
                      <td className="py-4 h-28 flex items-center justify-center text-red-600">
                        <button type="button">
                          <FaRegTrashAlt size={22} />
                        </button>
                      </td>
                    </tr>

                    {/* <!-- More product rows --> */}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="md:w-1/4">
              <div className="bg-light_bg dark:bg-dark_bg2 border-2 border-light_border dark:border-dark_border rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4 dark:text-txtWhite">
                  Summary
                </h2>
                <div className="flex justify-between mb-2">
                  <span className="dark:text-txtWhite">Subtotal</span>
                  <span className="flex items-center gap-2 dark:text-txtWhite">
                    5.3
                    <SolanaLogo style={{ width: "18px", height: "18px" }} />
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="dark:text-txtWhite">Taxes</span>
                  <span className="flex items-center gap-2 dark:text-txtWhite">
                    0.01
                    <SolanaLogo style={{ width: "18px", height: "18px" }} />
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="dark:text-txtWhite">Shipping</span>
                  <span className="flex items-center gap-2 dark:text-txtWhite">
                    $0.00
                  </span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between mb-2">
                  <span className="font-semibold dark:text-txtWhite">
                    Total
                  </span>
                  <span className="flex items-center gap-2 font-semibold dark:text-txtWhite">
                    5.31
                    <SolanaLogo style={{ width: "18px", height: "18px" }} />
                  </span>
                </div>
                <button
                  type="button"
                  className="bg-purpleButton text-txtWhite py-2 px-4 rounded-lg mt-4 w-full"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cartpage;

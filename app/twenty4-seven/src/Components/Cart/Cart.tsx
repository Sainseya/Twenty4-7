import React from "react";
import ProductInCart from "./ProductInCart";
import CartSummary from "./CartSummary";
import { fakeCartProductData } from "../../Data/fakeCartProductData";

const Cart: React.FC = () => {
  // Vérifier si au moins un produit est un NFT
  const haveOneNft = fakeCartProductData.some((cartItem) =>
    cartItem.cart_products.some(
      (product) => product.product.category.type === "nft"
    )
  );
  // Vérifier si tous les produits sont des NFT
  const allNft = fakeCartProductData.every((cartItem) =>
    cartItem.cart_products.every(
      (product) => product.product.category.type === "nft"
    )
  );

  let subtotalPriceNft = 0;
  let subtotalPriceOther = 0;

  // Parcours de fakeCartProductData pour calculer les sous-totaux
  fakeCartProductData.forEach((cartItem) => {
    cartItem.cart_products.forEach((product) => {
      if (product.product.category.type === "nft") {
        subtotalPriceNft += product.product.price * product.quantity;
      } else {
        subtotalPriceOther += product.product.price * product.quantity;
      }
    });
  });

  subtotalPriceNft = Math.round(subtotalPriceNft * 100) / 100;
  subtotalPriceOther = Math.round(subtotalPriceOther * 100) / 100;

  const taxNft = Math.round(0.1 * subtotalPriceNft * 100) / 100;
  const taxOther = Math.round(0.01 * subtotalPriceOther * 100) / 100;
  const shippingPrice = 5;

  return (
    <div className="w-full">
      <div className="flex flex-row gap-4">
        <div className="md:w-3/4">
          <div className="bg-light_bg2 dark:bg-dark_bg2 rounded-lg border-2 border-light_border dark:border-dark_border p-6 mb-12">
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
                {fakeCartProductData.map((cartItem, index) =>
                  cartItem.cart_products.map((product, subIndex) => (
                    <ProductInCart
                      key={subIndex}
                      productName={product.product.name}
                      quantity={product.quantity}
                      price={product.product.price}
                      isNft={product.product.category.type === "nft"}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <CartSummary
          subtotalPriceNft={subtotalPriceNft}
          subtotalPriceOther={subtotalPriceOther}
          taxeNft={taxNft}
          taxeOther={taxOther}
          shippingPrice={shippingPrice}
          allNft={allNft}
          haveOneNft={haveOneNft}
        />
      </div>
    </div>
  );
};

export default Cart;

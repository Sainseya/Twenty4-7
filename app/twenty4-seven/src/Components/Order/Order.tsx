import React from "react";
import OrderCard from "./OrderCard";

const Order: React.FC = () => {
  return (
    <div className="w-1/2">
      <div className="bg-light_bg2 dark:bg-dark_bg2  rounded-lg border-2 border-light_border dark:border-dark_border p-6 mb-16">
        <div className="font-semibold text-lg text-txtWhite mb-4">Orders</div>
        <div className="grid grid-cols-3 gap-8 items-center justify-items-center">
          <OrderCard numberOrder={0} dateOfOrder="02/02/2024" status="pending" />
          <OrderCard numberOrder={1} dateOfOrder="03/02/2024" status="shipped" />
          <OrderCard numberOrder={2} dateOfOrder="10/02/2024" status="cancelled" />
          <OrderCard numberOrder={3} dateOfOrder="07/03/2024" status="delivered" />
          <OrderCard numberOrder={4} dateOfOrder="07/03/2024" status="other" />
        </div>
      </div>
    </div>
  );
};

export default Order;

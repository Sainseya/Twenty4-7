import React from "react";
import { motion } from "framer-motion";
import { capitalizeWords, getPastilColor } from "../../Utils/Tools";

interface OrderCardProps {
  numberOrder: number;
  dateOfOrder: string;
  status: string;
}

const OrderCard: React.FC<OrderCardProps> = ({
  numberOrder,
  dateOfOrder,
  status,
}) => {

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      type="button"
      className="flex flex-col h-24 w-full text-txtWhite bg-txtPlaceholder rounded-xl border-2 border-light_border dark:border-dark_border p-3"
    >
      <div className="font-semibold text-xl h-full">
        Order n°{numberOrder + 1}
      </div>
      <div className="flex w-full justify-between">
        <div>{dateOfOrder}</div>
        <div className="font-semibold flex items-center gap-2">
          <div
            className={`size-[10px] rounded-full ${getPastilColor(status)}`}
            data-testid="status-badge"
          ></div>
          <div>{capitalizeWords(status)}</div>
        </div>
      </div>
    </motion.button>
  );
};

export default OrderCard;

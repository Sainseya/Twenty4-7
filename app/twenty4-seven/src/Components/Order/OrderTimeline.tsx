import React from "react";
import TimelineItem from "./TimelineItem";

interface OrderTimelineProps {
    orderNumber?: number;
}

const OrderTimeline: React.FC<OrderTimelineProps> = ({ orderNumber = 2 }) => {
  return (
    <div className="w-1/2">
      <div className="bg-light_bg2 dark:bg-dark_bg2 rounded-lg border-2 border-light_border dark:border-dark_border p-6 mb-16">
        <div className="text-lg font-semibold mb-4 dark:text-txtWhite">
          Timeline order n°{orderNumber}
        </div>

        <div className="container">
          <div className="flex flex-col md:grid grid-cols-12 text-gray-50">
            <TimelineItem status="package booked" date="03/02/2024" />
            <TimelineItem status="out for delivery" date="03/02/2024" />
            <TimelineItem status="in transit" date="04/02/2024" />
            {/* <TimelineItem status="cancelled" date="05/02/2024" /> */}
            <TimelineItem status="delivered " date="07/02/2024" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTimeline;

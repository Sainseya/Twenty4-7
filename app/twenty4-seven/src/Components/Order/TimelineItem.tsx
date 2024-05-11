import React from "react";
import { capitalizeWords, getTimelineColor } from "../../Utils/Tools";

interface TimelineItemProps {
  status: string;
  date: string;
  hour?: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  status,
  date,
  hour = "",
}) => {
  
  return (
    <div className="flex md:contents">
      <div className="col-start-2 col-end-4 mr-10 md:mx-auto relative">
        <div className="h-full w-6 flex items-center justify-center">
          <div className={`h-full w-1 ${getTimelineColor(status)} pointer-events-none`}></div>
        </div>
        <div className={`w-6 h-6 absolute top-1/2 -mt-3 rounded-full ${getTimelineColor(status)} shadow text-center`}></div>
      </div>
      <div className={`${getTimelineColor(status)} col-start-4 col-end-12 p-4 rounded-xl my-4 mr-auto shadow-md w-full`}>
        <h3 className="font-semibold text-lg mb-1">
          {capitalizeWords(status)}
        </h3>
        <p className="leading-tight text-justify w-full">
          {date} {hour && "," + hour}
        </p>
      </div>
    </div>
  );
};

export default TimelineItem;

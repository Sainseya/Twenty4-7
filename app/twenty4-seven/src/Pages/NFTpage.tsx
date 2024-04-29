import React from "react";
import Topbar from "../Components/navigation/Topbar";
import CollectionBanner from "../Components/Nft/CollectionBanner";

const NFTpage: React.FC = () => {
  return (
    <div>
      <Topbar />
      <CollectionBanner collectionName="MineBlock NFT" totalItems={42} totalValue={146} maxValue={4.5} />
      <div className="relative flex flex-col w-full px-44 bg-light_bg dark:bg-dark_bg pt-1">
        <div className="h-12 w-12 bg-blue-400"></div>
      </div>
    </div>
  );
};

export default NFTpage;

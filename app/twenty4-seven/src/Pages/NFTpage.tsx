import React from "react";
import Topbar from "../Components/navigation/Topbar";
import CollectionBanner from "../Components/Nft/CollectionBanner";
import NftNavBar from "../Components/navigation/NftNavBar";

const NFTpage: React.FC = () => {
  return (
    <div>
      <Topbar />
      <CollectionBanner
        collectionName="MineBlock NFT"
        totalItems={42}
        totalValue={146}
        maxValue={4.5}
      />
      <div className="relative flex flex-col w-full px-44 bg-light_bg dark:bg-dark_bg border-b-2 border-light_border dark:border-dark_border">
        <NftNavBar />
      </div>
    </div>
  );
};

export default NFTpage;

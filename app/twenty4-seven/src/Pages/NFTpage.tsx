import React from "react";
import Topbar from "../Components/navigation/Topbar";
import CollectionBanner from "../Components/Nft/CollectionBanner";
import NftNavBar from "../Components/navigation/NftNavBar";
import NftCard from "../Components/Nft/NftCard";

const NFTpage: React.FC = () => {
  const nbrOfNft = 10;

  return (
    <div className="flex flex-col bg-light_bg dark:bg-dark_bg">
      <Topbar />
      <CollectionBanner
        collectionName="MineBlock NFT"
        totalItems={42}
        totalValue={146}
        maxValue={4.5}
      />
      <div className="relative flex w-full px-44 bg-light_bg dark:bg-dark_bg border-b-2 border-light_border dark:border-dark_border">
        <NftNavBar />
      </div>
      <div className="flex-1 flex flex-row w-full px-44">
        <div className="flex flex-col w-80 bg-light_bg dark:bg-dark_bg2 border-x-2 border-light_border dark:border-dark_border">

        </div>
        <div className="flex-1 h-fit">
          <div className="mt-4 grid grid-cols-4 gap-y-10 p-4 items-center justify-items-center">
          {Array.from({ length: nbrOfNft }).map((_, index) => (
              <NftCard key={index} price={3.2} idCard={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTpage;

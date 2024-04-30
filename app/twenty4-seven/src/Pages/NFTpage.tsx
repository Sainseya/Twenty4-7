import React, { useState } from "react";

import Topbar from "../Components/navigation/Topbar";
import CollectionBanner from "../Components/Nft/CollectionBanner";
import NftNavBar from "../Components/navigation/NftNavBar";
import NftCard from "../Components/Nft/NftCard";
import SearchProductPanel from "../Components/Search/SearchProductPanel";

const NFTpage: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
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
        <NftNavBar activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
      </div>
      {activeIndex === 0 && (
        // Contenu pour Items
        <div className="flex-1 flex flex-row w-full px-44">
          <SearchProductPanel />
          <div className="flex-1 h-fit">
            <div className="mt-4 grid grid-cols-4 gap-y-10 p-4 items-center justify-items-center">
              {Array.from({ length: nbrOfNft }).map((_, index) => (
                <NftCard key={index} price={3.2} idCard={index} />
              ))}
            </div>
          </div>
        </div>
      )}
      {activeIndex === 1 && (
        // Contenu pour Market
        <div className="flex-1 flex flex-row w-full px-44">
          <div className="flex w-full justify-center items-center font-semibold text-4xl text-txtBlack dark:text-txtWhite">
            Market Coming Soon
          </div>
        </div>
      )}
      {activeIndex === 2 && (
        // Contenu pour News
        <div className="flex-1 flex flex-row w-full px-44">
          <div className="flex w-full justify-center items-center font-semibold text-4xl text-txtBlack dark:text-txtWhite">
            News Coming Soon
          </div>
        </div>
      )}
    </div>
  );
};

export default NFTpage;

import React from "react";
import BackgroundCollection from "../../Assets/MC background test.png";
import IconCollection from "../../Assets/NFT/Dirt Block.png";
import { ReactComponent as SolanaLogo } from "../../Assets/solanaLogoMark.svg";

interface CollectionBannerProps {
  collectionName: string;
  totalItems: number;
  totalValue: number;
  maxValue: number;
}

const CollectionBanner: React.FC<CollectionBannerProps> = ({
  collectionName,
  totalItems,
  totalValue,
  maxValue,
}) => {
  return (
    <div
      className="relative w-full h-60 bg-light_txtZone border-b-2 border-light_border dark:border-dark_border"
      style={{ pointerEvents: "none" }}
    >
      <img
        src={BackgroundCollection}
        alt="backgroundCollec"
        className="h-full w-full object-cover"
        loading="lazy"
      />
      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-white dark:from-black via-[#F1F1F1] dark:via-[#1F1F1F] via-40% to-transparent z-10"></div>
      <div className="absolute inset-0 px-44 z-20 flex flex-col justify-center">
        <div className="flex items-center mb-8">
          <img
            src={IconCollection}
            alt="iconCollection"
            className="size-24 bg-light_border dark:bg-dark_border border-2 border-light_border dark:border-dark_border rounded-xl mr-6"
            loading="lazy"
          ></img>
          <div className="text-2xl font-semibold text-txtBlack dark:text-txtWhite">
            {collectionName}
          </div>
        </div>
        <div className="flex gap-8">
          <div className="flex flex-col">
            <div className="font-semibold text-txtBlack dark:text-txtWhite text-xl flex items-center gap-2">
              <span>{totalItems}</span>
              {/* <SolanaLogo style={{ width: "18px", height: "18px" }} /> */}
            </div>
            <div className="text-base font-normal text-txtPlaceholder">
              Total items
            </div>
          </div>
          <div className="flex flex-col">
            <div className="font-semibold text-txtBlack dark:text-txtWhite text-xl flex items-center gap-2">
              <span>{totalValue}</span>
              <SolanaLogo style={{ width: "18px", height: "18px" }} />
            </div>
            <div className="text-base font-normal text-txtPlaceholder">
              Total value
            </div>
          </div>
          <div className="flex flex-col">
            <div className="font-semibold text-txtBlack dark:text-txtWhite text-xl flex items-center gap-2">
              <span>{maxValue}</span>
              <SolanaLogo style={{ width: "18px", height: "18px" }} />
            </div>
            <div className="text-base font-normal text-txtPlaceholder">Floor</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionBanner;

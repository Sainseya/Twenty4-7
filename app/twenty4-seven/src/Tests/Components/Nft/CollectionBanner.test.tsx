import React from "react";
import { render, screen } from "@testing-library/react";
import CollectionBanner from "../../../Components/Nft/CollectionBanner";

describe("CollectionBanner", () => {
  test("renders collection name correctly", () => {
    const collectionName = "My Collection";
    const totalItems = 10;
    const totalValue = 1000;
    const maxValue = 500;

    render(
      <CollectionBanner
        collectionName={collectionName}
        totalItems={totalItems}
        totalValue={totalValue}
        maxValue={maxValue}
      />
    );

    const collectionNameElement = screen.getByText(collectionName);
    expect(collectionNameElement).toBeInTheDocument();
  });

  test("renders values correctly", () => {
    const collectionName = "My Collection";
    const totalItems = 10;
    const totalValue = 1000;
    const maxValue = 500;

    render(
      <CollectionBanner
        collectionName={collectionName}
        totalItems={totalItems}
        totalValue={totalValue}
        maxValue={maxValue}
      />
    );

    const totalItemsValue = screen.getByText(totalItems.toString());
    const totalValueValue = screen.getByText(totalValue.toString());
    const maxValueValue = screen.getByText(maxValue.toString());

    expect(totalItemsValue).toBeInTheDocument();
    expect(totalValueValue).toBeInTheDocument();
    expect(maxValueValue).toBeInTheDocument();
  });
});

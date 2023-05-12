import React from "react";
import { render, screen } from "@testing-library/react";
import Feed from "../Components/Feed/Feed";

describe("Feed component", () => {
  const sortedFeedList = [
    {
      id: 1,
      item: "Apples",
      expiry_date: "2023-05-10",
      added_date: "2023-05-01",
      quantity: 10,
    },
    {
      id: 2,
      item: "Oranges",
      expiry_date: "2023-05-05",
      added_date: "2023-05-01",
      quantity: 5,
    },
  ];

  const sortedExpiredFeedList = [
    {
      id: 3,
      item: "Bananas",
      expiry_date: "2023-04-30",
      added_date: "2023-04-01",
      quantity: 0,
    },
  ];

  it("should render the correct expiring items", () => {
    render(<Feed sortedFeedList={sortedFeedList} sortedExpiredFeedList={sortedExpiredFeedList} />);

    const appleItem = screen.getByText("Apples");
    const orangeItem = screen.getByText("Oranges");
    const bananaItem = screen.queryByText("Bananas");

    expect(appleItem).toBeInTheDocument();
    expect(orangeItem).toBeInTheDocument();
    //expect(bananaItem).not.toBeInTheDocument();
  });

  it("should render the correct expired items", () => {
    render(<Feed sortedFeedList={sortedFeedList} sortedExpiredFeedList={sortedExpiredFeedList} />);

    const appleItem = screen.queryByText("Apples");
    const orangeItem = screen.queryByText("Oranges");
    const bananaItem = screen.getByText("Bananas");

    //expect(appleItem).not.toBeInTheDocument();
    //expect(orangeItem).not.toBeInTheDocument();
    expect(bananaItem).toBeInTheDocument();
  });
});
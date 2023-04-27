import React from "react";
import { render, waitFor } from "@testing-library/react";
import Index from "../pages/index";
import axiosInstance from "../util/axiosInstance";

jest.mock("../util/axiosInstance");

const mockFeedList = [
  {
    id: 1,
    item: "Apples",
    expiry_date: "2023-05-01",
    quantity: 5,
    added_date: "2023-04-01",
  },
  {
    id: 2,
    item: "Bananas",
    expiry_date: "2023-05-15",
    quantity: 3,
    added_date: "2023-04-10",
  },
];

describe("Index", () => {
  beforeEach(() => {
    axiosInstance.get.mockResolvedValueOnce(mockFeedList);
  });

  it("should render sorted feed list and sorted expired feed list", async () => {
    const { getByText } = render(<Index />);

    await waitFor(() => {
      expect(getByText("Expiring Soon Items")).toBeInTheDocument();
      expect(getByText("Expired Items")).toBeInTheDocument();
    });
  });
});
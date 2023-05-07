import ChartInf from "../interface/Stock/ChartType";
import StockContextType from "../interface/Stock/StockContextType";

// mock the Chart interface with the mock data
export const mockChart: ChartInf = {
  goodItems: [
    {
      Category: {
        id: "10",
        name: "Category 1",
        createdAt: new Date("2022-02-19T10:00:00Z"),
        updatedAt: new Date("2022-02-18T11:00:00Z"),
      },
      CategoryId: "10",
      ExpiryDate: new Date("2022-02-26T10:00:00Z"),
      ItemName: "Item 1",
      Stock: {
        ExpiryDate: new Date("2022-02-27T10:00:00Z"),
        category_id: "1",
        createdAt: new Date("2022-02-28T10:00:00Z"),
        price: "10.0",
        quantity: "29",
        updatedAt: new Date("2022-02-29T10:00:00Z"),
        id: "1",
      },
      StockId: "1",
      createdAt: new Date("2022-02-24T10:00:00Z"),
      updatedAt: new Date("2022-02-25T10:00:00Z"),
      id: "4",
    },
  ],
  checkoutHistory: [
    {
      cllgId: "1",
      itemName: "Item 2",
      itemType: "STOCK",
      quantity: "1",
      datePur: new Date("2022-02-21T10:00:00Z"),
      createdAt: new Date("2022-02-22T10:00:00Z"),
      updatedAt: new Date("2022-02-23T10:00:00Z"),
      StockId: "1",
      id: "7",
    },
  ],
  expiredItems: [
    {
      Category: {
        id: "1",
        name: "Category 1",
        createdAt: new Date("2022-02-17T10:00:00Z"),
        updatedAt: new Date("2022-02-16T11:00:00Z"),
      },
      CategoryId: "1",
      ExpiryDate: new Date("2022-02-15T10:00:00Z"),
      ItemName: "Item 13",
      Stock: {
        ExpiryDate: new Date("2022-02-14T10:00:00Z"),
        category_id: "1",
        createdAt: new Date("2022-02-13T10:00:00Z"),
        price: "10.0",
        quantity: "20",
        updatedAt: new Date("2022-02-12T10:00:00Z"),
        id: "2",
      },
      StockId: "1",
      createdAt: new Date("2022-02-11T10:00:00Z"),
      updatedAt: new Date("2022-02-10T10:00:00Z"),
      id: "2",
    },
  ],
  soonToBeExpired: [
    {
      Category: {
        id: "1",
        name: "Category 1",
        createdAt: new Date("2022-02-09T10:00:00Z"),
        updatedAt: new Date("2022-02-08T11:00:00Z"),
      },
      CategoryId: "1",
      ExpiryDate: new Date("2022-02-07T10:00:00Z"),
      ItemName: "Item 12",
      Stock: {
        ExpiryDate: new Date("2022-02-06T10:00:00Z"),
        category_id: "1",
        createdAt: new Date("2022-02-05T10:00:00Z"),
        price: "10.0",
        quantity: "20",
        updatedAt: new Date("2022-02-04T10:00:00Z"),
        id: "1",
      },
      StockId: "1",
      createdAt: new Date("2022-02-03T10:00:00Z"),
      id: "3",
      updatedAt: new Date("2022-02-02T10:00:00Z"),
    },
  ],
};

export const mockStockContextValue: StockContextType = {
  stockState: {
    categories: [],
    loading: "",
    chart: mockChart,
    err: "",
    errMsg: "",
  },
  getCategories: jest.fn(),
  putCategory: jest.fn(),
  putStock: jest.fn(),
  getChart: jest.fn(),
  checkoutItem: jest.fn(),
};

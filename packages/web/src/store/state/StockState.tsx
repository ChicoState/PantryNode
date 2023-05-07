import React, { useCallback, useReducer } from "react";
import Chart from "../../interface/Stock/ChartType";
import { StockTypes } from "../../interface/Stock/StockStateType";
import AddStockType from "../../interface/TransferTypes/AddStockType";
import CheckoutType from "../../interface/TransferTypes/CheckoutType";
import {
  categoriesSuccessDispatcher,
  chartSuccessDispatcher,
  toggleStockLoading,
} from "../ActionCreators";
import { baseUrl } from "../Constants";
import StockContext from "../context/StockContext";
import StockReducer, { initState } from "../reducer/StockReducer";

interface Props {
  children: React.ReactNode;
}

const StockState: React.FC<Props> = (props: Props) => {
  const [stockState, dispatch] = useReducer(StockReducer, initState);
  const getCategories = useCallback(async () => {
    const token = localStorage.getItem("token"); // get token from localStorage
    dispatch(toggleStockLoading(StockTypes.CATEGORY));
    fetch(baseUrl + "/sale/category", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // attach token to the Authorization header
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to retrieve categories");
        }
      })
      .then((data) => {
        console.log(data);
        dispatch(categoriesSuccessDispatcher(data.categories));
      })
      .catch((error) => {
        console.error(error);
        dispatch(toggleStockLoading(StockTypes.BLANK));
      });
  }, []);

  const putCategory = useCallback(
    async (name: string) => {
      dispatch(toggleStockLoading(StockTypes.CATEGORY));
      const token = localStorage.getItem("token"); // get token from localStorage

      fetch(baseUrl + "/sale/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // attach token to the Authorization header
        },
        body: JSON.stringify({ name: name }), // add category name to request body
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to create category");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data); // log the category object
          dispatch(toggleStockLoading(StockTypes.BLANK));
          getCategories();
        })
        .catch((error) => {
          console.error(error);
          dispatch(toggleStockLoading(StockTypes.BLANK));
        });
    },
    [getCategories]
  );

  const putStock = useCallback(async (stock: AddStockType) => {
    dispatch(toggleStockLoading(StockTypes.STOCK));
    const token = localStorage.getItem("token");
    fetch(baseUrl + "/sale/addStock", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        itemName: stock.itemName,
        category_id: stock.category_id,
        quantity: stock.quantity,
        ExpiryDate: stock.ExpiryDate,
        price: stock.price,
        donorID: stock.donorID,
      }),
    })
      .then((response) => response.json())
      .then((data) => dispatch(toggleStockLoading(StockTypes.BLANK)))
      .catch((error) => dispatch(toggleStockLoading(StockTypes.BLANK)));
  }, []);

  const checkoutItem = useCallback(async (c: CheckoutType) => {
    dispatch(toggleStockLoading(StockTypes.CHECKOUT));
    // function delayedFunction() {
    //   console.log("This message will appear after 3 seconds!");
    //   dispatch(errStock(StockTypes.CHECKOUT, "Quantity not suffecient"));
    //   // dispatch(errDispatcher(GeneralTypes.LOGIN, "Invalid username || pwd"));
    // }

    // // Call setTimeout() with a delay of 3000 milliseconds (3 seconds)
    // await setTimeout(delayedFunction, 3000);

    fetch(baseUrl + "/sale/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        itemId: c.itemId,
        quantityX: c.quantityX,
        cllgId: c.cllgId,
      }),
    })
      .then((response) => response.json())
      .then((data) => dispatch(toggleStockLoading(StockTypes.BLANK)))
      .catch((error) => dispatch(toggleStockLoading(StockTypes.BLANK)));
  }, []);

  const getChart = useCallback(async () => {
    dispatch(toggleStockLoading(StockTypes.CHART));
    var c: Chart = {
      goodItems: [],
      checkoutHistory: [],
      expiredItems: [],
      soonToBeExpired: [],
    };

    Promise.all([
      fetch(baseUrl + "/sale/charts", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }),
      fetch(baseUrl + "/sale/checkout", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }),
    ])
      .then(([chartsResponse, checkoutResponse]) =>
        Promise.all([chartsResponse.json(), checkoutResponse.json()])
      )
      .then(([chartsData, checkoutData]) => {
        c.goodItems = chartsData.goodItems;
        c.expiredItems = chartsData.expiredItems;
        c.soonToBeExpired = chartsData.soonToBeExpired;
        c.checkoutHistory = checkoutData.purchased;
        dispatch(chartSuccessDispatcher(c));
      })
      .catch((error) => {
        dispatch(toggleStockLoading(StockTypes.BLANK));
      });
  }, []);

  return (
    <StockContext.Provider
      value={{
        stockState: stockState,
        getCategories: getCategories,
        putCategory: putCategory,
        putStock: putStock,
        getChart: getChart,
        checkoutItem: checkoutItem,
      }}
    >
      {props.children}
    </StockContext.Provider>
  );
};

export default StockState;

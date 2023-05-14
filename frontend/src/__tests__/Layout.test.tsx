import React from 'react';
import { render } from "@testing-library/react";
import Layout from "../Components/Layout";
import { MemoryRouter } from "react-router";
import { store } from "../store";
import { Provider } from "react-redux";

describe("Layout", () => {
  it("should render children", () => {
    const { getByText } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <Layout>Test</Layout>
                </MemoryRouter>{" "}
            </Provider>
        );
    expect(getByText("Test")).toBeInTheDocument();
  });
});
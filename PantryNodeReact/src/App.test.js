"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@testing-library/react");
const App_1 = __importDefault(require("./App"));
test("renders pantry node heading", () => {
    (0, react_2.render)(<App_1.default />);
    // this is meant to find only only 'pantry node' text
    const linkElement = react_2.screen.getByText(/Pantry Node/i);
    expect(linkElement).toBeInTheDocument();
});

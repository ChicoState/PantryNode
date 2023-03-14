"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Container_1 = __importDefault(require("@mui/material/Container"));
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const Box_1 = __importDefault(require("@mui/material/Box"));
function App() {
    return (<Container_1.default maxWidth="sm">
      <Box_1.default sx={{ my: 4 }}>
        <Typography_1.default variant="h3" component="h1" color="primary" fontWeight="bold" gutterBottom>
          Pantry Node
        </Typography_1.default>
        <Typography_1.default variant="h5" component="p" color="gray">
          A web application that allows you to manage your pantry.
        </Typography_1.default>
      </Box_1.default>
    </Container_1.default>);
}
exports.default = App;

import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import CreatingForm from "./components/CreatingForm";
import Test from "./components/Test";
// lets update the office project
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [],
  },
  {
    path: "/create",
    element: <CreatingForm />,
  },
  {
    path: "/test",
    element: <Test />,
  },
]);

export default router;

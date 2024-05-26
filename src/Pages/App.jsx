import { BrowserRouter as Router, Route, Switch, createBrowserRouter } from "react-router-dom";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import { Dashboard } from "@mui/icons-material";

const router = createBrowserRouter([
    {
        path:"/",
        element: <LoginPage />
    },
    {
        path:"/signup",
        element: <Signup />
    },
    {
        path:"/dashboard",
        element: <Dashboard />
    },
]);
import LoginPage from "../Pages/Login";
import SignUp from "../Pages/Signup";
import Dashboard from "../Pages/Dashboard";
import Main from "../Pages/Main";
import Users from "../Pages/Users";

const routes = [
    {
        path: "/",
        element: <LoginPage />
    },
    {
        path: "/signup",
        element: <SignUp />
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
            {
                index: true,
                element: <Main />
            },
            {
                path: "users/:id",
                element: <Users />
            },
            {
                path: "reports",
                element: <div>Reports</div>
            },
            {
                path: "settings",
                element: <div>Settings</div>
            }
        ]
    }
];

export default routes;
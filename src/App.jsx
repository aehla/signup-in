import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./Pages/Login"
import SignupPage from "./Pages/Signup"


const router = createBrowserRouter([
  {
    path: "/" ,
  element: <LoginPage/>
},
{
  path: "/signup" ,
element: <SignupPage/>
}
]);

function App() {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App

import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts/RootLayouts";
import Home from "../Pages/Home/Home/Home";
import Coverage from "../Pages/Coverage/Coverage";
import AuthLayout from "../Layouts/AuthLayout/AuthLayout";
import Login from "../Pages/Auth/Login/Login";

const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayouts,
        children:[
            {
                index:true,Component: Home
            },
            {
                path:'/coverage',
                Component: Coverage,
                loader: ()=>fetch('/warehouses.json'),
                hydrateFallbackElement: <p>Loading...</p>
            }
        ]

    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: '/login',
                Component: Login

            },
            {
                path: '/register'

            }
        ]
    }
])
export default router;
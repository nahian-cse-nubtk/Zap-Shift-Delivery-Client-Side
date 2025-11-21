import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts/RootLayouts";
import Home from "../Pages/Home/Home/Home";
import Coverage from "../Pages/Coverage/Coverage";
import AuthLayout from "../Layouts/AuthLayout/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Rider from "../Pages/Rider/Rider";
import SendParcel from "../Pages/SendParcel/SendParcel";

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
                element: <PrivateRoute><Coverage></Coverage></PrivateRoute>,
                loader: ()=>fetch('/warehouses.json'),
                hydrateFallbackElement: <p>Loading...</p>
            },
            {
                path: '/rider',
                element: <PrivateRoute><Rider></Rider></PrivateRoute>
            },
            {
                path:'/sendParcel',
                element: <PrivateRoute><SendParcel></SendParcel></PrivateRoute>
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
                path: '/register',
                Component: Register

            }
        ]
    }
])
export default router;
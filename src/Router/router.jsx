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
import DashboardLayout from "../Layouts/DashboardLayout/DashboardLayout";
import MyParcel from "../Pages/Dashboard/MyParcel/MyParcel";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../Pages/Dashboard/PaymentSuccess/PaymentSuccess";
import CancelPayment from "../Pages/Dashboard/CancelPayment/CancelPayment";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";

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
                loader: ()=>fetch('/warehouses.json'),
                hydrateFallbackElement: <p>Loading...</p>,
                element: <PrivateRoute><Rider></Rider></PrivateRoute>
            },
            {
                path:'/sendParcel',
                element: <PrivateRoute><SendParcel></SendParcel></PrivateRoute>,
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
                path: '/register',
                Component: Register

            }
        ]
    },
    {
        path: '/dashboard',
        Component: DashboardLayout,
        children:[
            {
                path: 'myParcel',
                Component: MyParcel

            },
            {
                path:'parecels/:parcelId',
                element: <PrivateRoute><Payment></Payment></PrivateRoute>
            },
            {
                path: 'paymentSuccess',
                element: <PaymentSuccess></PaymentSuccess>
            },
            {
                path: 'cancelPayment',
                element: <CancelPayment></CancelPayment>
            },
            {
                path: 'paymentHistory',
                element: <PaymentHistory></PaymentHistory>
            }
        ]
    }
])
export default router;
import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts/RootLayouts";
import Home from "../Pages/Home/Home/Home";
import Coverage from "../Pages/Coverage/Coverage";

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

    }
])
export default router;
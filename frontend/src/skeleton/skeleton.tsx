import { BrowserRouter, Route, Routes } from "react-router-dom";
import RoutesData from "../providers/routesProvider";
import Layout from "./componenets/layout/layout";



const Skeleton=()=>{

    return (<BrowserRouter>
    <Routes>
        {RoutesData.map(route=>{
            return <Route element={<Layout>{route.component}</Layout>} path={route.path} key={route.id}></Route>
        })}
    </Routes>
        
    </BrowserRouter>)


  
}

export default Skeleton
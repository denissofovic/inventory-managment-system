import Route from "../models/routes";
import { v4 as uuidv4 } from "uuid";
import Overview from "../views/overview/overview";
import Manage from "../views/manage/manage";
import NotFoundPage from "../views/notFound/notFoundPage";


const RoutesData:Route[]=[
    {
        routeName:'Dashboard',
        id:uuidv4(),
        path:'/dashboard',
        component:<Overview />
    },
    {
        routeName:'Form',
        id:uuidv4(),
        path:'/form',
        component:<Manage />
    },
    {
        routeName: "home",
        path: "/",
        id: uuidv4(),
        component: <Overview />,
      },
      {
        routeName: "all",
        path: "/*",
        id: uuidv4(),
        component: <NotFoundPage />,
      },
]

export default RoutesData
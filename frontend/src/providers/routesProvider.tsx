import Route from "../models/routes";
import { v4 as uuidv4 } from "uuid";
import Overview from "../views/overview/overview";
import Manage from "../views/manage/manage";
import NotFoundPage from "../views/notFound/notFoundPage";
import DeleteItem from "../views/delete-item/deleteItem";

import { useTranslation } from 'react-i18next';

let homeId = uuidv4();

const RoutesData: Route[] = [
  {
    routeName: "overview",
    id: homeId,
    path: "/dashboard",
    isNavigation: true,
    component: <Overview />,
  },
  {
    routeName: "manage",
    id: uuidv4(),
    path: "/form",
    isNavigation: true,
    component: <Manage />,
  },
  {
    routeName: "home",
    path: "/",
    id: homeId,
    isNavigation: false,
    component: <Overview />,
  },
  {
    routeName: "all",
    path: "/*",
    id: uuidv4(),
    isNavigation: false,
    component: <NotFoundPage />,
  },
  {
    routeName:'deleteItem',
    path:"/delete-item/:id",
    id:uuidv4(),
    isNavigation:false,
    component:<DeleteItem/>
  }
];

export default RoutesData;

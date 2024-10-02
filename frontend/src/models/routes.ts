interface Route {
  routeName: string;
  path: string;
  id: string;
  isNavigation: boolean;
  component: React.ReactNode;
}
export default Route;

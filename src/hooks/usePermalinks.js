import { useContext } from "react";
import { PermalinksContext } from "../context/PermalinksConfig";
import useLocation from "./useLocation";
import useRouteData from "./useRouteData";

export default function usePermalinks({ routes, /*id, config*/ }) {
  const { pathArray, queryObject, pushLocation, navigateTo } = useLocation();

  const {
    routes: contextRoutes,
    // config: contextConfig,
    // id: contextId
  } = useContext(PermalinksContext); // Makes contextRoutes the fallback if routes is not provided.

  // const _id = id ?? contextId;
  const _routes = routes || contextRoutes; //use context if not routes provided

  const push = (path) => pushLocation({ path }, path);
  const navigate = (path) => navigateTo({ path });

  const route = _routes?.find((route) => pathArray?.includes(route.entry));

  const routePath = pathArray?.slice(
    pathArray?.findIndex((path) => path === route?.entry) + 1
  );

  const { routeData, isLoading } = useRouteData({
    route,
    routePath,
    queryObject
  });

  //TODO Receive default routeData and push location.

  return { data: routeData, isLoading, push, navigate };
}

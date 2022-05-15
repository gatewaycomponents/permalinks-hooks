import { useContext } from "react";
import { PermalinksContext } from "../context/PermalinksConfig";
import useLocation from "./useLocation";
import useRoute from "./useRoute";

// Uses an array of routes objects to return permalink and location data for current URL. This is an enhanced version of useLocation.
export default function usePermalinks({ routes, /*id, config*/ }) {
  const { patharray, query: locationQuery, ...location } = useLocation();

  const {
    routes: contextRoutes,
    // config: contextConfig,
    // id: contextId
  } = useContext(PermalinksContext); // Makes contextRoutes the fallback if routes is not provided.

  // const _id = id ?? contextId;
  const _routes = routes || contextRoutes; //use context if not routes provided

  //route object that matches current URL.
  const route = _routes?.find((route) => patharray?.includes(route.entry));

  //slice of current URL that matches route from entry point.
  const routePath = patharray?.slice(
    patharray?.findIndex((path) => path === route?.entry) + 1
  );
  
  const { permalink, query, entry } = useRoute({
    route,
    routePath,
    query: locationQuery
  });

  //TODO Receive default routeData and push location.

  return {
    ...location,
    entry,
    permalink,
    query,
    patharray,
    isLoading: !permalink && !location?.pathname
  };
}

import { useEffect, useMemo, useState } from "react";
import { off, on, trigger } from "../helpers/events";

export default function useLocation() {
  const [location, setLocation] = useState({ pathname: null, search: null });

  //Set location on first render
  useEffect(() => {
    setLocation({
      pathname: window.location.pathname,
      search: window.location.search
    });
  }, []);

  //Set location when user navigates using back button
  useEffect(() => {
    const popStateEvent = () => {
      setLocation({
        pathname: window.location.pathname,
        search: window.location.search
      });
    };
    window.addEventListener("popstate", popStateEvent);
    return () => {
      window.removeEventListener("popstate", popStateEvent);
    };
  }, []);

  //Set location when new location is pushed to History
  useEffect(() => {
    const locationChanged = () => {
      setLocation({
        pathname: window.location.pathname,
        search: window.location.search
      });
    };
    on("locationpush", locationChanged);
    return () => off("locationpush", locationChanged);
  }, []);

  //Get path parts from url and add them to an array
  const pathArray = useMemo(
    () => (location.pathname ? [...location.pathname.split("/").slice(1)] : []),
    [location.pathname]
  );

  //Get query key and value pairs and add them to an object
  const queryObject = useMemo(() => {
    const queryParams = new URLSearchParams(location.search);
    return { ...Object.fromEntries(queryParams?.entries()) };
  }, [location.search]);

  //Function to navigate to given url
  const navigateTo = ({ path }) => {
    const newLocation =
      window.location.origin + (path.startsWith("/") ? "" : "/") + path;
    window.location.assign(newLocation);
  };

  //Function to pushState to given path
  const pushLocation = ({ state, path }) => {
    const newLocation =
      window.location.origin + (path.startsWith("/") ? "" : "/") + path;
    window.history.pushState(state, "", newLocation);
    trigger("locationpush");
  };

  return { pathArray, queryObject, pushLocation, navigateTo };
}

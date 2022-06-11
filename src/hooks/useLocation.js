import {  useState, useEffect, useCallback } from "react";
import { off, on } from "../helpers/events";

// Uses current window location and adds enhanced functionality
export default function useLocation() {
  const [location, setLocation] = useState({ ...getCurrentLocation() });

  const updateLocation = useCallback(() => {
    const currentLocation = getCurrentLocation();

    if (location.href !== currentLocation.href) {
      setLocation(currentLocation)
    }
  },[location.href]);

  //Set location on first render
  useEffect(() => {
    // const eventOptions = {};
    //Update location when user navigates using back button
    on("popstate", updateLocation);
    //Update location when new location is pushed to History
    on("locationpush", updateLocation);

    return () => {
      off("popstate", updateLocation);
      off("locationpush", updateLocation);
    };
  }, [updateLocation]);

  return location;
}

//Get query key-value pairs and add them to an object
const getQuery = (search) => {
  const queryParams = new URLSearchParams(search);
  return { ...Object.fromEntries(queryParams?.entries()) };
}

//Get path parts from url and add them to an array
const getPatharray = (pathname) => (pathname && pathname !== "/" ? [...pathname.split("/").slice(1)] : [])

const getCurrentLocation = () => {
  const {
    href,
    origin,
    protocol,
    host,
    hostname,
    port,
    pathname,
    search,
    hash,
    reload,
    replace
  } = window?.location || {}; 
  return {
    href,
    origin,
    protocol,
    host,
    hostname,
    port,
    pathname,
    search,
    hash,
    reload,
    replace,
    patharray: getPatharray(pathname),
    query: getQuery(search)
  }
}
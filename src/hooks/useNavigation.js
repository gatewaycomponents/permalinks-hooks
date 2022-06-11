import { useCallback } from "react";
import { trigger } from "../helpers/events";

// Uses current window location and adds enhanced functionality
export default function useNavigation() {

  const getNewLocation = (path) => {
    if (!path) return;
    const {pathname,search,origin} = window.location;
    const currentPath = pathname + search;
    const newPath = (path.startsWith("/") ? "" : "/") + path;

    if (currentPath === newPath) return;
    return origin + newPath;
  }
 
  //Function to navigate to given url relative to baseUrl
  const load = (path) => {
    const newLocation = getNewLocation(path);

    if (!newLocation) return;
    window.location.assign(newLocation);
  };

  //Function to handle client-side transitions
  const push = useCallback((path, state = {date: Date.now()},title) => {
    const newLocation = getNewLocation(path);

    if (!newLocation) return false;

    if (title) document.title = title;
    window.history.pushState({ ...state }, "", newLocation);
    trigger("locationpush", { state: { ...state } });
    return true;
  }, []);
  
  //Function to handle client-side transitions
  const replace = (path, state = { date: Date.now() }, title) => {
    const newLocation = getNewLocation(path);

    if (title) document.title = title;
    window.history.replaceState(state,"",newLocation);
  };

  //Function to navigate back in history
  const back = () => window.history.back();
  const forward = () => window.history.forward();

  return {replace, push, load, back, forward };
}
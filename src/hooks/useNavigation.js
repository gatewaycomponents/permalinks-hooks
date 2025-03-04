import { trigger } from "../helpers/events";

// Uses current window location and adds enhanced functionality
export default function useNavigation() {

  const getNewLocation = (path) => {
    if (!path) return;
    const {pathname,search,origin} = window.location;
    const currentPath = pathname + search;
    const newPath = (path.startsWith("/") ? "" : "/") + path;

    if (currentPath === newPath) return null;
    return origin + newPath;
  }
 
  //Function to navigate to given url relative to baseUrl
  const load = (path) => {
    const newLocation = getNewLocation(path);

    if (!newLocation) return;
    window.location.assign(newLocation);
  };

  //Function to handle client-side transitions
  const push = (path, state = {}) => {
    const newLocation = getNewLocation(path);

    if (!newLocation) return false;
    window.history.pushState({...state, date: Date.now()}, "", newLocation);
    trigger("locationpush", { state: { ...state, date: Date.now() } });
    return true;
  };

  //Function to navigate back in history
  const back = () => window.history.back();
  const forward = () => window.history.forward();

  return { push, load, back, forward };
}
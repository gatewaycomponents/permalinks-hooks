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
  const push = (path, state = null) => {
    const newLocation = getNewLocation(path);

    if (!newLocation) return;
    window.history.pushState(state, "", newLocation);
    trigger("locationpush");
  };

  //Function to navigate back in history
  const back = () => window.history.back();

  return { push, load, back };
}
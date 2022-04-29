import { trigger } from "../helpers/events";

// Uses current window location and adds enhanced functionality
export default function useNavigation() {
 
  //Function to navigate to given url relative to baseUrl
  const load = (path) => {
    const newLocation = window.location.origin + (path.startsWith("/") ? "" : "/") + path;
    window.location.assign(newLocation);
  };

  //Function to handle client-side transitions
  const push = (path, state = null) => {
    const newLocation = window.location.origin + (path.startsWith("/") ? "" : "/") + path;
    window.history.pushState(state, "", newLocation);
    trigger("locationpush");
  };

  //Function to navigate back in history
  const back = () => window.history.back();

  return { push, load, back };
}
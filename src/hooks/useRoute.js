
// Uses a route object and current path to retrieve permalink data from current URL
export default function useRoute({ route, routePath, query: locationQuery }) {

  //Returns an object with data from window path and query that matches given route.
  const data = routePath && route?.path.reduce((prev, curr, index) => {
    
    const catchAll = curr.startsWith("...");
    const pathname = catchAll ? curr.split("...")[1] : curr;
    const queryMatch = prev.query[pathname];
    
    if (queryMatch) {
      prev.permalink[pathname] = queryMatch;
      delete prev.query[pathname];
    } else {
      const path = catchAll ? routePath.slice(index)?.join("/") : routePath[index];
      prev.permalink[pathname] = path !== "" ? path : undefined;
    }

    return prev;
  }, {permalink: {}, query: {...locationQuery}});
  
  return data ? {...data, entry: route.entry} : {};
}

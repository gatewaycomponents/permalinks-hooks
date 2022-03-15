export default function useRouteData({ route, routePath, queryObject }) {
  const routeMap = routePath && route?.path.reduce((prev, curr, index) => {
    const catchAll = curr.startsWith("...");
    const pathName = catchAll ? curr.split("...")[1] : curr;
    const path = catchAll ? routePath.slice(index)?.join("/") : routePath[index];

    return { ...prev, [pathName]: path };
  }, {});
  return {
    routeData: routeMap ? { ...routeMap, ...queryObject, entry: route.entry } : null,
    isLoading: false
  };
}

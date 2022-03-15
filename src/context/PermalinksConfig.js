import PropTypes from "prop-types";
import React from "react";

export const PermalinksContext = React.createContext({
  routes: [
    {
      entry: "/",
      path: [],
      context: {}
    }
  ],
  id: null
});

export default function PermalinksConfig({
  routes,
  config,
  id,
  children
}) {
  const value = { routes, config, id };
  return (
    <PermalinksContext.Provider value={value}>
      {children}
    </PermalinksContext.Provider>
  );
}
PermalinksConfig.propTypes = {
  /** Array of routes */
  routes: PropTypes.arrayOf(PropTypes.object),
  config: PropTypes.object,
  id: PropTypes.string,
  children: PropTypes.node.isRequired
};
import React from 'react';
import PropTypes from 'prop-types';

export default function useRoute() {
  return (<></>);
};

useRoute.propTypes = {
  /** route object containing the path structure and the entry point for the path */
  route: PropTypes.object,
  /** An array of path parts taken from url */
  routePath: PropTypes.arrayOf(PropTypes.string),
  /** An object containing key-value pairs from an url query parameters */
  query: PropTypes.object,
};
import React from 'react';
import PropTypes from 'prop-types';

export default function usePermalinks() {
  return (<></>);
};

usePermalinks.propTypes = {
  /** Array of route objects */
  routes: PropTypes.arrayOf(PropTypes.object),
};
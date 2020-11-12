import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';

ReactGA.initialize(process.env.REACT_APP_GA);

export const withTracker = (WrappedComponent, options = {}) => {
  const trackPage = (page) => {
    ReactGA.set({
      page,
      ...options,
    });
    ReactGA.pageview(page);
  };

  const HOC = (props) => {
    const { location } = props;
    const { pathname } = location;

    useEffect(() => trackPage(pathname), [pathname]);

    return <WrappedComponent {...props} />;
  };

  HOC.propTypes = {
    location: PropTypes.object.isRequired,
  };

  return HOC;
};

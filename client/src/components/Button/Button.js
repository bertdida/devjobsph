import PropTypes from 'prop-types';
import { Button as BTButton } from 'react-bootstrap';

import './Button.scss';

export function Button({
  children, className = null, ...rest
}) {
  return (
    <BTButton {...rest} className={`${className || ''} button`}>
      {children}
    </BTButton>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Button.defaultProps = {
  className: null,
};

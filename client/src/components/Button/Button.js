import PropTypes from 'prop-types';
import { Button as BTButton } from 'react-bootstrap';

import './Button.scss';

export function Button({
  children, className = null, variant = null, ...rest
}) {
  return (
    <BTButton
      {...rest}
      variant={variant}
      className={`${className ? `${className} ` : ''}button`}
    >
      {children}
    </BTButton>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  variant: PropTypes.string,
};

Button.defaultProps = {
  className: null,
  variant: null,
};

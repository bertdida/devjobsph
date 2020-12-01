import PropTypes from 'prop-types';
import { Button as BTButton } from 'react-bootstrap';
import clsx from 'clsx';

import './Button.scss';

export function Button({
  children, className = null, variant = null, ...rest
}) {
  return (
    <BTButton
      {...rest}
      variant={variant}
      className={clsx({
        [className]: className,
        button: true,
        'button--secondary': !variant,
      })}
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

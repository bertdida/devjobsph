import { useState } from 'react';

import { Button } from 'components/Button';
import { FilterNav } from 'components/FilterNav';

export function FilterNavToggle() {
  const [showNav, setShowNav] = useState(false);

  function onClick() {
    setShowNav((prev) => !prev);
  }

  function onHide() {
    setShowNav(false);
  }

  return (
    <>
      <Button variant="primary" className="mr-1" size="sm" onClick={onClick}>
        All Filters
      </Button>

      <FilterNav show={showNav} onHide={onHide} />
    </>
  );
}

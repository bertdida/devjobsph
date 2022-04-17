import { useState } from 'react';

import { Button } from 'components/Button';
import { FilterNav } from 'components/FilterNav';
import { MdFilterList } from 'react-icons/md';

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
      <Button className="mr-1 p-0" size="sm" onClick={onClick}>
        <MdFilterList size={20} />
      </Button>

      <FilterNav show={showNav} onHide={onHide} />
    </>
  );
}

import { useContext } from 'react';

import { ThemeContext } from 'common/Theme';
import { Button } from 'components/Button';
import { BsMoon } from 'react-icons/bs';
import { FaSun } from 'react-icons/fa';

export function DarkModeToggle() {
  const { isDarkMode, toggle } = useContext(ThemeContext);

  return (
    <Button
      className="p-0"
      aria-label="Toggle dark mode"
      size="sm"
      onClick={toggle}
    >
      {isDarkMode ? <FaSun size={18} /> : <BsMoon size={18} />}
    </Button>
  );
}

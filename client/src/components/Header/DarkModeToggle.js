import { useContext } from 'react';

import { ThemeContext } from 'common/Theme';
import { Button } from 'components/Button';
import { BsMoon } from 'react-icons/bs';
import { FaSun } from 'react-icons/fa';

export function DarkModeToggle() {
  const { isDarkMode, toggle } = useContext(ThemeContext);

  return (
    <Button className="darkModeToggle" variant={null} onClick={toggle}>
      {isDarkMode ? <FaSun /> : <BsMoon />}
    </Button>
  );
}

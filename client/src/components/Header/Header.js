import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import { BsMoon } from 'react-icons/bs';
import { FaSun } from 'react-icons/fa';

import { ThemeContext } from 'common/Theme';
import { FilterNav } from 'components/FilterNav';
import { Title } from 'components/Title';
import { Button } from 'components/Button';
import './Header.scss';

export function Header() {
  const { isDarkMode, toggle } = useContext(ThemeContext);

  return (
    <Container as="header" fluid className="header">
      <Container className="header__inner">
        <Title />

        <div>
          <FilterNav />
          <Button variant={null} onClick={toggle}>
            {isDarkMode ? <FaSun /> : <BsMoon />}
          </Button>
        </div>
      </Container>
    </Container>
  );
}

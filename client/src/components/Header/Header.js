import { useContext } from 'react';
import Container from 'react-bootstrap/Container';

import { ThemeContext } from 'common/Theme';
import { SunIcon, MoonIcon } from 'common/icons';
import { Title } from 'components/Title';
import './Header.scss';

export function Header() {
  const { isDarkMode, toggle } = useContext(ThemeContext);

  return (
    <Container as="header" fluid className="header">
      <Container className="header__inner">
        <Title />

        <button type="button" className="header__toggleBtn" onClick={toggle}>
          {isDarkMode ? <SunIcon /> : <MoonIcon />}
        </button>
      </Container>
    </Container>
  );
}

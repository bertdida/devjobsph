import Container from 'react-bootstrap/Container';

import { FilterNav } from 'components/FilterNav';
import { Title } from 'components/Title';
import { DarkModeToggle } from './DarkModeToggle';

export function Header() {
  return (
    <Container as="header" fluid className="header">
      <Container className="header__inner">
        <Title />

        <div>
          <FilterNav />
          <DarkModeToggle />
        </div>
      </Container>
    </Container>
  );
}

import Container from 'react-bootstrap/Container';

import { Title } from 'components/Title';
import { DarkModeToggle } from './DarkModeToggle';
import { FilterNavToggle } from './FilterNavToggle';

export function Header() {
  return (
    <Container as="header" fluid className="header">
      <Container className="header__inner">
        <Title />

        <div>
          <FilterNavToggle />
          <DarkModeToggle />
        </div>
      </Container>
    </Container>
  );
}

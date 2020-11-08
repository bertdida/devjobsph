import Container from 'react-bootstrap/Container';

import { GitHubIcon } from 'common/icons';
import './Footer.scss';

export function Footer() {
  return (
    <Container as="footer" fluid className="footer">
      <Container className="footer__inner">
        <a
          className="footer__link"
          href="https://github.com/bertdida/DevJobsPh"
          target="_blank"
          rel="noreferrer"
        >
          <GitHubIcon />
        </a>

        <span className="footer__title">DevJobsPh</span>
      </Container>
    </Container>
  );
}

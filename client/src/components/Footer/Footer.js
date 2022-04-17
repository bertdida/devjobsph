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
          aria-label="GitHub"
        >
          <GitHubIcon />
        </a>

        <div className="footer__by">
          👨‍💻 by&nbsp;
          <a className="footer__link" href="https://bertdida.github.io" target="_blank" rel="noreferrer">
            bertdida
          </a>
        </div>
      </Container>
    </Container>
  );
}

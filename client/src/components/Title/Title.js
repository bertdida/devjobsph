import { Link } from 'react-router-dom';

import './Title.scss';

export function Title() {
  return (
    <h1 className="title">
      <Link to="/">
        DevJobsPh
      </Link>
    </h1>
  );
}

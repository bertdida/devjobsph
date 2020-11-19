import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';

import { useOnClickOutside } from './useOnClickOutside';
import './JobTags.scss';

export function JobTags({ tags: tagsProp }) {
  const root = useRef();
  const history = useHistory();
  const [showHidden, setShowHidden] = useState(false);

  const tags = tagsProp.map((tag, index) => ({
    name: tag,
    isHidden: index >= 3, // first 3 will be initially shown
  }));

  const hiddenTags = tags.filter(({ isHidden }) => isHidden);
  const totalHidden = hiddenTags.length;

  useOnClickOutside(root, showLessTags);

  useEffect(() => {
    showLessTags();
  }, [history.location.search]);

  function showLessTags() {
    setShowHidden(false);
  }

  function showAllTags() {
    setShowHidden(true);
  }

  function onKeyPress(event) {
    const { which } = event;
    const enterOrSpace = which === 13 || which === 32;

    if (enterOrSpace) {
      event.preventDefault();
      showAllTags(event);
    }
  }

  return (
    <div
      ref={root}
      className={`jobTags ${showHidden ? 'jobTags--showHidden' : ''}`}
    >
      <List tags={tags} />

      {totalHidden > 0 && (
        <span
          role="button"
          tabIndex={0}
          onClick={showAllTags}
          onKeyPress={onKeyPress}
          className="jobTags__showMore"
        >
          {`${totalHidden} more`}
        </span>
      )}
    </div>
  );
}

JobTags.propTypes = {
  tags: PropTypes.array.isRequired,
};

function List({ tags }) {
  return (
    <ul className="jobTags__list">
      {tags.map((tag) => (
        <ListItem key={tag.name} tag={tag} />
      ))}
    </ul>
  );
}

List.propTypes = {
  tags: PropTypes.array.isRequired,
};

function ListItem({ tag }) {
  const { name, isHidden } = tag;

  return (
    <li
      className={`jobTags__listItem ${
        isHidden ? 'jobTags__listItem--isHidden' : ''
      }`}
      data-value={name}
    >
      <Link to={`/?tag=${name.toLowerCase()}`}>{`#${name}`}</Link>
    </li>
  );
}

ListItem.propTypes = {
  tag: PropTypes.object.isRequired,
};

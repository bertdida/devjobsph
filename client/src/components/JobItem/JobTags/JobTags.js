import { useRef, useState } from "react";

import { useOnClickOutside } from "./useOnClickOutside";
import "./JobTags.scss";

export function JobTags({ tags: tagsProp }) {
  const root = useRef();
  const [showHidden, setShowHidden] = useState(false);
  useOnClickOutside(root, onClickOutside);

  const tags = tagsProp.map((tag, index) => ({
    name: tag,
    isHidden: index >= 3, // first 3 will be initially shown
  }));

  const hiddenTags = tags.filter(({ isHidden }) => isHidden);
  const totalHidden = hiddenTags.length;

  function onClick() {
    setShowHidden(true);
  }

  function onClickOutside() {
    setShowHidden(false);
  }

  return (
    <div
      ref={root}
      className={`jobTags ${showHidden ? "jobTags--showHidden" : ""}`}
    >
      <List tags={tags} />

      {totalHidden > 0 && !showHidden && (
        <span className="jobTags__showMore" onClick={onClick}>
          {totalHidden} more
        </span>
      )}
    </div>
  );
}

function List({ tags }) {
  return (
    <ul className="jobTags__list">
      {tags.map((tag, index) => (
        <ListItem key={index} tag={tag} />
      ))}
    </ul>
  );
}

function ListItem({ tag }) {
  const { name, isHidden } = tag;

  return (
    <li
      className={`jobTags__listItem ${
        isHidden ? "jobTags__listItem--isHidden" : ""
      }`}
      data-value={name}
    >
      <span>{name}</span>
    </li>
  );
}

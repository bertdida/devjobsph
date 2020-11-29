import PropTypes from 'prop-types';

import './FormPills.scss';

export function FormPills({ tags, label, onToggleTag }) {
  return (
    <div>
      <p>{label}</p>
      <ul className="formPills">
        {tags.map((tag) => (
          <li key={tag.text} className="formPills__item">
            <FormPill tag={tag} onToggle={onToggleTag} />
          </li>
        ))}
      </ul>
    </div>
  );
}

FormPills.propTypes = {
  tags: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  onToggleTag: PropTypes.func.isRequired,
};

function FormPill({ tag, onToggle }) {
  const { text, isSelected } = tag;

  function onChange() {
    onToggle(text);
  }

  return (
    <div className="formPill" tabIndex="0" role="button">
      <input
        id={text}
        type="checkbox"
        value={text}
        checked={isSelected}
        onChange={onChange}
        className="formPill__checkbox"
      />

      <label htmlFor={text} className="formPill__label">
        <span className="formPill__text">{`#${text}`}</span>
      </label>
    </div>
  );
}

FormPill.propTypes = {
  tag: PropTypes.object.isRequired,
  onToggle: PropTypes.func.isRequired,
};

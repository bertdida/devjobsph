import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';

import api from 'common/api';
import { Button } from 'components/Button';
import { Loader } from 'components/Loader';
import { FormPills } from './FormPills';
import './FilterNav.scss';

export function FilterNav() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [isShown, setIsShown] = useState(false);
  const [form, setForm] = useState({
    tags: null,
    requireTag: false,
    requireSalary: false,
  });

  const { location } = history;
  const { search, pathname } = location;

  useEffect(() => {
    if (isLoading) {
      return;
    }

    parseQueryParams(search);
  }, [isLoading, search]);

  useEffect(() => {
    const unListen = history.listen((currLocation) => {
      parseQueryParams(currLocation.search);
    });

    return function cleanUp() {
      unListen();
    };
  }, [history]);

  useEffect(() => {
    if (form.tags !== null) {
      return;
    }

    (async () => {
      const response = await api.fetchTags();
      const { data } = response.data;
      const tags = data.map((tag) => ({ text: tag, isSelected: false }));
      setForm({ ...form, tags });
      setIsLoading(false);
    })();
  }, [form]);

  function parseQueryParams(query) {
    const currQuery = queryString.parse(query);
    const { tag: tagQuery = '', hasTag, hasSalary } = currQuery;

    const tagsQuery = Array.isArray(tagQuery) ? tagQuery : [tagQuery];
    const tagsQueryLower = tagsQuery.map((tag) => tag.toLowerCase());

    setForm((prev) => {
      const tags = prev.tags.map((tag) => ({
        ...tag, isSelected: tagsQueryLower.includes(tag.text.toLowerCase()),
      }));

      return {
        ...prev,
        tags,
        requireTag: Boolean(hasTag),
        requireSalary: Boolean(hasSalary),
      };
    });
  }

  function toggleNav() {
    setIsShown((prev) => !prev);
  }

  function closeNav() {
    setIsShown(false);
  }

  function onToggleTag(tagText) {
    const tags = form.tags.map(({ isSelected, ...rest }) => ({
      ...rest, isSelected: rest.text !== tagText ? isSelected : !isSelected,
    }));

    setForm({ ...form, tags });
  }

  function onFormSubmit(event) {
    event.preventDefault();

    const { tags, requireTag, requireSalary } = form;
    const selectedTags = tags.filter(({ isSelected }) => isSelected);

    const selectedTagsTexts = selectedTags.map(({ text }) => text.toLowerCase());
    const params = queryString.stringify({
      tag: selectedTagsTexts,
      ...(requireTag ? { hasTag: true } : null),
      ...(requireSalary ? { hasSalary: true } : null),
    });

    history.push({ pathname, search: `?${params}` });
    closeNav();
  }

  function resetForm() {
    history.push({ pathname });
  }

  function onCancel() {
    parseQueryParams(search);
    closeNav();
  }

  function onChange(event) {
    const { target } = event;
    const { name, checked } = target;
    setForm({ ...form, [name]: checked });
  }

  return (
    <>
      <Button variant="primary" className="mr-1" size="sm" onClick={toggleNav}>
        All Filters
      </Button>

      <div className={clsx({
        filterNav: true,
        'filterNav--show': isShown,
      })}
      >
        <div className="header filterNav__header">
          <div className="header__inner">
            <h4 className="h5 mb-0">All jobs filters</h4>
          </div>
        </div>

        {isLoading
          ? <MyLoader /> : (
            <>
              <div className="filterNav__body">
                <Form>
                  <Form.Group>
                    <FormPills
                      tags={form.tags}
                      onToggleTag={onToggleTag}
                      label="Tags"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Check
                      type="switch"
                      id="requireTag"
                      name="requireTag"
                      label="Hide jobs without tags"
                      checked={form.requireTag}
                      onChange={onChange}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Check
                      type="switch"
                      id="requireSalary"
                      name="requireSalary"
                      label="Hide jobs without salary"
                      checked={form.requireSalary}
                      onChange={onChange}
                    />
                  </Form.Group>
                </Form>
              </div>

              <div className="filterNav__footer">
                <div className="filterNav__buttonGroup">
                  <Button onClick={resetForm}>
                    Reset
                  </Button>
                </div>

                <Button className="mr-1" onClick={onCancel}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={onFormSubmit}>
                  Apply
                </Button>
              </div>
            </>
          )}
      </div>
    </>
  );
}

function MyLoader() {
  return (
    <div className="mt-3">
      <Loader />
    </div>
  );
}

import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';

import api from 'common/api';
import { Button } from 'components/Button';
import { Loader } from 'components/Loader';
import { FormPills } from './FormPills';

import './FilterNav.scss';

export function FilterNav() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [isShown, setIsShown] = useState(false);
  const [form, setForm] = useState({ tags: [] });

  const { location } = history;
  const { pathname } = location;

  const selectedTags = form.tags.filter(({ isSelected }) => isSelected);
  const hasSelected = selectedTags.length > 0;

  useEffect(() => {
    if (!isShown || form.tags.length) {
      return;
    }

    (async () => {
      const response = await api.fetchTags();
      const { data } = response.data;
      const tags = data.map((tag) => ({ text: tag, isSelected: false }));
      setForm({ ...form, tags });
      setIsLoading(false);
    })();
  }, [form, isShown]);

  function toggleNav() {
    setIsShown((prev) => !prev);
  }

  function closeNav() {
    setIsShown(false);
  }

  function onToggleTag(tagText) {
    // eslint-disable-next-line arrow-body-style
    const tags = form.tags.map(({ isSelected, ...rest }) => {
      return { ...rest, isSelected: rest.text !== tagText ? isSelected : !isSelected };
    });

    setForm({ ...form, tags });
  }

  function onFormSubmit(event) {
    event.preventDefault();

    if (!selectedTags.length) {
      closeNav();
      return;
    }

    const selectedTagsTexts = selectedTags.map(({ text }) => text.toLowerCase());
    const params = queryString.stringify({ tag: selectedTagsTexts });

    history.push({ pathname, search: `?${params}` });
    closeNav();
  }

  function resetForm() {
    const tags = form.tags.map((tag) => ({ ...tag, isSelected: false }));
    history.push({ pathname, search: null });
    setForm({ ...form, tags });
  }

  return (
    <>
      <Button size="sm mr-1" onClick={toggleNav}>
        All Filters
      </Button>

      <div className={`filterNav ${isShown ? 'filterNav--show' : ''}`}>
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
                </Form>
              </div>

              <div className="filterNav__footer">
                <div className="filterNav__buttonGroup">
                  <Button variant={null} onClick={resetForm} disabled={!hasSelected}>
                    Reset
                  </Button>
                </div>

                <Button variant={null} className="mr-1" onClick={closeNav}>
                  Cancel
                </Button>
                <Button disabled={!hasSelected} onClick={onFormSubmit}>
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

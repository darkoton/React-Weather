import { useState, useEffect, useRef } from 'react';
import '@/assets/style/components/search.scss';
import { HiOutlineMapPin } from 'react-icons/hi2';
import PropTypes from 'prop-types';
import cn from 'classnames';

export default function SearchInput({
  result = [],
  value = null,
  onChange,
  onSelect,
}) {
  const [selectIndex, setSelectIndex] = useState(0);
  const [focus, setFocus] = useState(false);
  let initRef = useRef(false);

  useEffect(() => {
    if (!initRef.current) {
      initRef.current = true;
      return;
    }

    function handleKeyDown(event) {
      if (event.code == 'ArrowUp') {
        event.preventDefault();
        if (0 < selectIndex) {
          setSelectIndex(selectIndex - 1);
        }
      } else if (event.code == 'ArrowDown') {
        event.preventDefault();
        if (result.length - 1 > selectIndex) {
          setSelectIndex(selectIndex + 1);
        }
      } else if (event.code == 'Enter') {
        onSelect(result[selectIndex]);
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [result, selectIndex, onSelect]);

  function onBlur() {
    setTimeout(() => {
      setFocus(false);
    }, 100);
  }

  return (
    <div className="search">
      <HiOutlineMapPin className="search__icon" />
      <input
        placeholder="Your city"
        type="text"
        value={value}
        onChange={onChange}
        className="search__input"
        onFocus={() => setFocus(true)}
        onBlur={onBlur}
      />
      {focus && !!result.length && (
        <div className="search__result-list">
          {
            <ul className="search__result-list-body">
              {result.map((r, i) => (
                <li
                  key={i}
                  className={cn(
                    'search__result-item',
                    i == selectIndex && 'select',
                  )}
                  onClick={() => onSelect(r)}
                >
                  <div className="search__result-name">{r.name}</div>
                  <div className="search__result-state">
                    {r.state} ({r.country})
                  </div>
                </li>
              ))}
            </ul>
          }
        </div>
      )}
    </div>
  );
}

SearchInput.propTypes = {
  result: PropTypes.array,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onSelect: PropTypes.func,
};

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesUp } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

const ScrollArrow = ({ isLoading }) => {
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.scrollY > 400) {
      setShowScroll(true);
    } else if (showScroll && window.scrollY <= 400) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.addEventListener('scroll', checkScrollTop);

  let styles = {
    display: showScroll ? 'flex' : 'none',
  };

  return (
    <>
      <FontAwesomeIcon
        icon={faAnglesUp}
        onClick={scrollTop}
        style={styles}
        className={classNames({
          'scroll-up-show': true,
          'scroll-hide': isLoading,
        })}
      />
    </>
  );
};

export default ScrollArrow;

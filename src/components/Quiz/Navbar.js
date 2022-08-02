import classNames from 'classnames';

const Navbar = ({ setQuizStarted, darkMode, toggleDarkMode }) => {
  return (
    <>
      <div
        className={classNames({
          'navbar nav': true,
          'nav-dark': darkMode,
        })}
      >
        <h1 className="navbar nav-logo" onClick={() => setQuizStarted(false)}>
          <span>Q</span>
          <span
            className={classNames({
              'logo-text': darkMode,
            })}
          >
            uizzical
          </span>
        </h1>
        <div className="toggler">
          <p className="toggler__light">Light</p>
          <div className="toggler__slider" onClick={toggleDarkMode}>
            <div className="toggler__slider--circle"></div>
          </div>
          <p className="toggler__dark">Dark</p>
        </div>
      </div>
    </>
  );
};

export default Navbar;

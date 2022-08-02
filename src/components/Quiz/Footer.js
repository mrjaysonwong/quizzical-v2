import classNames from 'classnames';

const Footer = ({ darkMode }) => {
  return (
    <>
      <div
        className={classNames({
          'footer-container': true,
          'footer-dark': darkMode,
          'footer-container-dark': darkMode,
        })}
      >
        <footer>The Stax dev © 2022</footer>
      </div>
    </>
  );
};

export default Footer;

import { useState } from 'react';
import classNames from 'classnames';
import {
  Navbar,
  Footer,
  StartQuizScreen,
  QuestionsScreen,
  Loading,
} from './components/Quiz';

const App = () => {
  const [isLoading, setLoading] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [formData, setFormData] = useState({
    numOfQuestions: '5',
    category: '',
    difficulty: '',
    type: '',
  });

  const [apiError, setApiError] = useState({
    show: false,
    message: '',
  });

  const [darkMode, setDarkMode] = useState(true);

  function toggleDarkMode() {
    setDarkMode((prevMode) => !prevMode);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value, //computed properties same as [event.target.name]: event.target.value
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setApiError({
      show: false,
      message: '',
    });
    setQuizStarted(true);
  }

  function handleApiError(error) {
    setQuizStarted(false);
    setApiError({
      show: true,
      message: error.message,
    });
    return;
  }

  return (
    <>
      <Navbar
        setQuizStarted={setQuizStarted}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
      <main
        className={classNames({
          'quiz-main': true,
          'quiz-main-dark': darkMode,
          dark: darkMode,
        })}
      >
        {isLoading && <Loading />}
        {!quizStarted ? (
          <StartQuizScreen
            apiError={apiError}
            handleApiError={handleApiError}
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        ) : (
          <QuestionsScreen
            handleApiError={handleApiError}
            formData={formData}
            setLoading={setLoading}
            isLoading={isLoading}
            darkMode={darkMode}
          />
        )}
      </main>
      <Footer darkMode={darkMode} />
    </>
  );
};

export default App;

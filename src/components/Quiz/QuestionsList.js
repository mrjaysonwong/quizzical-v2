import classNames from 'classnames';
import Question from '../Quiz/Question';

const QuestionsList = ({
  questions,
  toggleSelect,
  isChecked,
  isLoading,
  darkMode,
}) => {
  const questionElements = questions.map((question, index) => {
    return (
      <Question
        key={question.id}
        index={index + 1}
        toggleSelect={toggleSelect}
        isChecked={isChecked}
        darkMode={darkMode}
        {...question}
      />
    );
  });

  return (
    <>
      <div
        className={classNames({
          'questions-container': true,
          'questions-results': isChecked,
          'questions-results-hide': isLoading,
        })}
      >
        {questionElements}
      </div>
    </>
  );
};

export default QuestionsList;

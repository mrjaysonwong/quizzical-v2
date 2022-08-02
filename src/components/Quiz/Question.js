import classNames from 'classnames';
import sanitizeHtml from 'sanitize-html';

const Question = ({
  index,
  id,
  question,
  answers,
  toggleSelect,
  isChecked,
  darkMode,
}) => {
  const answerElements = answers.map((answer) => {
    return (
      <button
        key={answer.id}
        id={answer.id}
        className={classNames({
          'btn btn-answer': true,
          'btn btn-answer-dark': darkMode,
          'answer-held': answer.isHeld,
          'answer-held-incorrect':
            isChecked && answer.isHeld && !answer.isCorrect,
          'answer-correct': isChecked && answer.isCorrect,
          'answer-incorrect': isChecked && !answer.isCorrect,
        })}
        onClick={() => toggleSelect(id, answer.id)}
      >
        {sanitizeHtml(answer.value)}
      </button>
    );
  });
  return (
    <>
      <div className="question-container">
        <h3 className="question-title ">
          {index}. {sanitizeHtml(question)}
        </h3>
        <div className="btn-container">{answerElements}</div>
      </div>
    </>
  );
};

export default Question;

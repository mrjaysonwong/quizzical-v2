import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import QuestionsList from './QuestionsList';
import getQuestions from '../../utils/triviaApi';
import classNames from 'classnames';
import ScrollArrow from './ScrollArrow';

const QuestionsScreen = ({
  formData,
  handleApiError,
  setLoading,
  isLoading,
  darkMode,
}) => {
  const [questions, setQuestions] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (!isChecked) {
      loadQuestions();
    }
  }, [isChecked]); // eslint-disable-line react-hooks/exhaustive-deps

  async function loadQuestions() {
    setLoading(true);
    try {
      const data = await getQuestions(formData);
      setQuestions(processData(data));
    } catch (error) {
      handleApiError(error);
      setLoading(false);
      return;
    }
    setLoading(false);
  }

  function processData(data) {
    function correctAns_arrObj(correct_answer) {
      return {
        value: correct_answer,
        id: nanoid(),
        isCorrect: true,
        isHeld: false,
      };
    }

    function incorrectAns_arrObj(incorrect_answers) {
      return incorrect_answers.map((incorrect_answer) => {
        return {
          value: incorrect_answer,
          id: nanoid(),
          isCorrect: false,
          isHeld: false,
        };
      });
    }

    function shuffleAnswers(answersArray) {
      return answersArray.sort(() => Math.random() - 0.5);
    }

    return data.map((item) => {
      return {
        ...item,
        id: nanoid(),
        question: item.question,
        answers: shuffleAnswers([
          correctAns_arrObj(item.correct_answer),
          ...incorrectAns_arrObj(item.incorrect_answers),
        ]),
      };
    });
  }

  function toggleSelect(questionId, answerId) {
    setQuestions((prevQuestions) =>
      prevQuestions.map((prevQuestion) => {
        return prevQuestion.id === questionId
          ? {
              ...prevQuestion,
              answers: prevQuestion.answers.map((answer) => {
                return answer.id === answerId
                  ? { ...answer, isHeld: !answer.isHeld }
                  : { ...answer, isHeld: false };
              }),
            }
          : prevQuestion;
      })
    );

    return;
  }

  function handleScore() {
    if (isChecked) {
      let score = 0;
      for (let i = 0; i < questions.length; i++) {
        for (let j = 0; j < questions[i].answers.length; j++) {
          const answer = questions[i].answers[j];
          if (answer.isHeld && answer.isCorrect) {
            score++;
          }
        }
      }
      return score;
    }
  }

  return (
    <>
      <div className="init-container">
        <QuestionsList
          questions={questions}
          toggleSelect={toggleSelect}
          isChecked={isChecked}
          isLoading={isLoading}
          darkMode={darkMode}
        />
        {questions.length > 0 && <ScrollArrow isLoading={isLoading} />}
      </div>
      {isChecked && (
        <p>
          You scored {handleScore()}/{questions.length} correct answers!
        </p>
      )}
      {questions.length > 0 && (
        <button
          className={classNames({
            'btn btn-secondary': true,
            'btn-secondary-hide': isLoading,
          })}
          onClick={() => setIsChecked((prevChecked) => !prevChecked)}
        >
          {!isChecked ? 'Check answers' : 'Play again'}
        </button>
      )}
    </>
  );
};

export default QuestionsScreen;

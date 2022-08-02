import React, { useState, useEffect } from 'react';
import getCategory from '../../utils/categoryApi';

const StartQuizScreen = ({
  apiError,
  handleApiError,
  formData,
  handleChange,
  handleSubmit,
  darkMode,
}) => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    loadCategory();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function loadCategory() {
    try {
      const data = await getCategory();
      setCategory(data);
    } catch (error) {
      handleApiError(error);
      return;
    }
  }

  const categoryOptions = category.map((category) => {
    return (
      <option key={category.id} value={category.id}>
        {category.name}
      </option>
    );
  });

  return (
    <>
      <h1 className="quiz-title">
        <span>Quizzical</span>
      </h1>
      <p className="quiz-description">
        This is a knowledge quiz app. Pick your answers from the options
        provided. It uses data from Open Trivia Database - an open source
        database
      </p>

      {apiError.show && (
        <div className="error-container">
          <p className="error">{apiError.message}</p>
        </div>
      )}
      <form className="quiz-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Number of questions</label>
          <input
            type="number"
            min="5"
            max="50"
            id="numOfQuestions"
            name="numOfQuestions"
            value={formData.numOfQuestions}
            onChange={handleChange}
            {...(formData.numOfQuestions.length === 0 && {
              placeholder: 'Cannot be empty',
            })}
          ></input>
        </div>
        <div className="form-field">
          <label>Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Any Category</option>
            {categoryOptions}
          </select>
        </div>
        <div className="form-field">
          <label>Difficulty</label>
          <select
            id="difficulty"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
          >
            <option value="">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div className="form-field">
          <label>Type</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="">Any Type</option>
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True / False</option>
          </select>
        </div>

        <button
          className="btn btn-primary"
          {...(formData.numOfQuestions.length === 0 && { disabled: true })}
        >
          Start Quiz
        </button>
      </form>
    </>
  );
};

export default StartQuizScreen;

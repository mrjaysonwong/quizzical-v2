const responseCode = Object.freeze({
  SUCCESS: 0,
  NO_RESULTS: 1,
  INVALID_PARAMETER: 2,
  TOKEN_NOT_FOUND: 3,
  TOKEN_EMPTY: 4,
});

async function getQuestions({
  numOfQuestions = '',
  category = '',
  difficulty = '',
  type = '',
}) {
  const res = await fetch(
  `https://opentdb.com/api.php?amount=${numOfQuestions}&category=${category}&difficulty=${difficulty}&type=${type}`
  );
  if (!res.ok) {
    throw new Error(
      'An error occurred while trying to get trivia questions. Please try again later.'
    );
  }
  const data = await res.json();
  if (data.response_code === responseCode.NO_RESULTS) {
    throw new Error(
      'There are currently no results with the given options. Please try again with different options.'
    );
  }

  if (data.response_code !== responseCode.SUCCESS) {
    throw new Error(
      'An error occurred while trying to get trivia questions. Please try again later.'
    );
  }
  return data.results;
}

export default getQuestions;

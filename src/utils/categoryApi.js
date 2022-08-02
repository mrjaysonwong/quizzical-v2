async function getCategory() {
  const url = 'https://opentdb.com/api_category.php';
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(
      'An error occurred while trying to get category. Please try again later.'
    );
  }

  const data = await res.json();

  return data.trivia_categories;
}

export default getCategory;

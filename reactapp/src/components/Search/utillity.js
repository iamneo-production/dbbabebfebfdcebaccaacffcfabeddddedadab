import axios from 'axios';

async function fetchData(searchTerm, setResults) {
  const apiUrl = 'https://en.wikipedia.org/w/api.php';
  const params = {
    action: 'opensearch',
    format: 'json',
    origin: '*',
    search: searchTerm,
  };

  const queryString = Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');

  const url = `${apiUrl}?${queryString}`;

  try {
    const response = await axios.get(url);
    const [, titles, descriptions, urls] = response.data;
    const results = titles.map((title, index) => ({ title, description: descriptions[index], url: urls[index] }));
    setResults(results);
  } catch (error) {
    console.error(error);
    setResults([]);
  }
}

export default fetchData;

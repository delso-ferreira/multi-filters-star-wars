const fetchAPI = async (url) => {
  const getFetch = await fetch(url);
  if (!getFetch.ok) {
    const newError = await getFetch.json();
    throw newError.message;
  }

  return getFetch.json();
};

export default fetchAPI;

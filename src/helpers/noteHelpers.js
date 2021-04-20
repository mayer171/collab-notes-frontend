const PostNote = async (body, baseUrl = process.env.REACT_APP_BACKEND_URL) => {
  const request = {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type' : 'application/json',

    },
    body: JSON.stringify(body),
  };

  const response = await fetch(baseUrl + "notes", request);
  return await response.json();
}

const GetByUsername = async (username, baseUrl = process.env.REACT_APP_BACKEND_URL) => {
  const request = {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
  };

  const response = await fetch(baseUrl + "allby/" + username);
  return await response.json();
}

export { PostNote, GetByUsername }

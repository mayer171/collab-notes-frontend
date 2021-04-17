const LogIn = async (body, baseUrl = process.env.REACT_APP_BACKEND_URL) => {
  const request = {
    method: 'POST',
    mode: 'cors',
    credendtials: 'include',
    headers: {
      'Content-Type' : 'application/json',

    },
    body: JSON.stringify(body),
  };

  const response = await fetch(baseUrl + "sessions", request);
  return await response.json();
}

export { LogIn }

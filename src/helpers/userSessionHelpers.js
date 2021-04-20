const LogIn = async (body, baseUrl = process.env.REACT_APP_BACKEND_URL) => {
  const request = {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type' : 'application/json',

    },
    body: JSON.stringify(body),
  };

  const response = await fetch(baseUrl + "sessions", request);
  const parsed = await response.json();
  parsed.success = response.ok;
  return parsed;
}

export { LogIn }

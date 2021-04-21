// –––––––––––––––––––––––––––––––––––––––––
// Create a request options object
// – defaults to GET with no body
// –––––––––––––––––––––––––––––––––––––––––
const buildReq = (body = null, method = "GET") => {

  const request = {
    method: method,
    mode: 'cors',
    credentials: 'include'
  }

  if (body) {
    request.headers = {
      'Content-Type' : 'application/json',
    };
    request.body = JSON.stringify(body);
  }

  return request;
}

// –––––––––––––––––––––––––––––––––––––––––
// Parse response to JSON and append a
// success flag
// –––––––––––––––––––––––––––––––––––––––––
const parseRes = async (response) => {
  const parsed = await response.json();
  parsed.success = response.ok;
  return parsed;
}

export { buildReq, parseRes };

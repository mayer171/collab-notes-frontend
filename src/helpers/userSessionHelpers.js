import { buildReq, parseRes } from './utils';

// –––––––––––––––––––––––––––––––––––––––––
// A login attempt
//
// arg1: body {
//    username: string,
//    password: string
// }
// –––––––––––––––––––––––––––––––––––––––––
const LogIn = async (body, baseUrl = process.env.REACT_APP_BACKEND_URL) => {
  const route = baseUrl + 'sessions/';
  const request = buildReq(body, 'POST');
  const response = await fetch(route, request);
  return await parseRes(response);
}

// –––––––––––––––––––––––––––––––––––––––––
// Create a new user attempt
// arg1: body {
//    username: string,
//    password: string
// }
// –––––––––––––––––––––––––––––––––––––––––
const SignUp = async (body, baseUrl = process.env.REACT_APP_BACKEND_URL) => {
  const route = baseUrl + 'users/';
  const request = buildReq(body, 'POST');
  const response = await fetch(route, request);
  return await parseRes(response);
}

// –––––––––––––––––––––––––––––––––––––––––
// A route to check for a browser session on
// the server side
// –––––––––––––––––––––––––––––––––––––––––
const CheckIn = async (body, baseUrl = process.env.REACT_APP_BACKEND_URL) => {
  const route = baseUrl + 'sessions/';
  const request = buildReq();
  const response = await fetch(route, request);
  return await parseRes(response);
}

export { LogIn, SignUp, CheckIn }

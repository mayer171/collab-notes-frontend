import { buildReq, parseRes } from './utils';

// –––––––––––––––––––––––––––––––––––––––––
// Create a new note on DB
// –––––––––––––––––––––––––––––––––––––––––
const PostNote = async (body, baseUrl = process.env.REACT_APP_BACKEND_URL) => {
  const route = baseUrl + 'notes/';
  const request = buildReq(body, 'POST');
  const response = await fetch(route, request);
  return await parseRes(response);
}

// –––––––––––––––––––––––––––––––––––––––––
// Get a note from DB
// –––––––––––––––––––––––––––––––––––––––––
const GetNote = async (noteID, baseUrl = process.env.REACT_APP_BACKEND_URL) => {
  const route = baseUrl + "notes/" + noteID;
  const request = buildReq();
  const response = await fetch(route, request);
  return await parseRes(response);
}

// –––––––––––––––––––––––––––––––––––––––––
// Update a new note on DB
// –––––––––––––––––––––––––––––––––––––––––
const UpdateNote = async (noteID, body, baseUrl = process.env.REACT_APP_BACKEND_URL) => {
  const route = baseUrl + 'notes/' + noteID;
  const request = buildReq(body, 'PUT');
  const response = await fetch(route, request);
  return await parseRes(response);
}

// –––––––––––––––––––––––––––––––––––––––––
// Delete
// –––––––––––––––––––––––––––––––––––––––––
const DeleteNote = async (noteID, body, baseUrl = process.env.REACT_APP_BACKEND_URL) => {
  const route = baseUrl + 'notes/' + noteID;
  const request = buildReq(null, 'DELETE');
  const response = await fetch(route, request);
  return await parseRes(response);
}

// –––––––––––––––––––––––––––––––––––––––––
// Get a user's owned notes
// –––––––––––––––––––––––––––––––––––––––––
const GetUserOwnNotes = async (username, baseUrl = process.env.REACT_APP_BACKEND_URL) => {
  const route = baseUrl + 'notes/allby/' + username;
  const request = buildReq();
  const response = await fetch(route, request);
  return await parseRes(response);
}

// –––––––––––––––––––––––––––––––––––––––––
// Get a user's shared notes
// –––––––––––––––––––––––––––––––––––––––––
const GetUserSharedNotes = async (username, baseUrl = process.env.REACT_APP_BACKEND_URL) => {
  const route = baseUrl + 'notes/allshared/' + username;
  const request = buildReq();
  const response = await fetch(route, request);
  return await parseRes(response);
}

// –––––––––––––––––––––––––––––––––––––––––
// Add a collaborator to a note
// –––––––––––––––––––––––––––––––––––––––––
const AddCollaborator = async (noteID, username, baseUrl = process.env.REACT_APP_BACKEND_URL) => {
  const route = baseUrl + 'notes/' + noteID;
  const request = buildReq({ username: username, operation: 'add' }, 'PATCH');
  const response = await fetch(route, request);
  return await parseRes(response);
}

// –––––––––––––––––––––––––––––––––––––––––
// Remove a collaborator from a note
// –––––––––––––––––––––––––––––––––––––––––
const RemoveCollaborator = async (noteID, username, baseUrl = process.env.REACT_APP_BACKEND_URL) => {
  const route = baseUrl + 'notes/' + noteID;
  const request = buildReq({ username: username, operation: 'remove' }, 'PATCH');
  const response = await fetch(route, request);
  return await parseRes(response);
}

export {
  PostNote,
  GetNote,
  UpdateNote,
  DeleteNote,
  GetUserOwnNotes,
  GetUserSharedNotes,
  AddCollaborator,
  RemoveCollaborator,
}

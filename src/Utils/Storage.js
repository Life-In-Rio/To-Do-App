
const USER_KEY = "taskflow_user";

export function saveUser(name) {
  localStorage.setItem(USER_KEY, name);
}

export function getUser() {
  return localStorage.getItem(USER_KEY);
}

export function removeUser() {
  localStorage.removeItem(USER_KEY);
}

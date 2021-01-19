const URL = "http://auth-and-stripe-server.herokuapp.com/users";

export function register(
  email,
  firstName,
  lastName,
  password,
  confirmPassword
) {
  const registerUrl = URL + "/register";
  const body = {
    email: email,
    firstName: firstName,
    lastName: lastName,
    password: password,
    confirmPassword: confirmPassword,
  };
  return fetch(registerUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((response) => {
    if (response.ok) {
      console.log("User " + email + " successfully registered");
    } else throw new Error("HTTP response status not code 200 as expected.");
  });
}

export function login(email, password) {
  const loginUrl = URL + "/login";
  const body = {
    email: email,
    password: password,
  };
  return fetch(loginUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      console.log("User " + email + " successfully logged");
      return responseJson.token;
    });
}

export function validateUserToken(userToken) {
  const validateUrl = URL + "/validate";
  return fetch(validateUrl, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + userToken,
    },
  }).then((response) => {
    if (response.ok) {
      console.log("User token validated");
    } else throw new Error("HTTP response status not code 200 as expected.");
  });
}

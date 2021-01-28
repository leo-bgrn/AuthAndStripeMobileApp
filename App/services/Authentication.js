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
    } else throw new Error("HTTP response status not code 200 as expected.");
  });
}

export function getInfo(userToken) {
  const getInfoUrl = URL + "/me";
  return fetch(getInfoUrl, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + userToken,
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("HTTP response status not code 200 as expected.");
    }
    return response.json();
  });
}

export function loginWithGoogle(googleAccessToken) {
  const loginWithGoogleUrl = URL + "/google";
  const body = {
    accessToken: googleAccessToken,
  };
  return fetch(loginWithGoogleUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson.token;
    });
}

export function loginWithFacebook(facebookAccessToken) {
  const loginWithFacebookUrl = URL + "/facebook";
  const body = {
    accessToken: facebookAccessToken,
  };
  return fetch(loginWithFacebookUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson.token;
    });
}

const URL = "http://auth-and-stripe-server.herokuapp.com/payment";

export function pay(userToken, cardToken) {
  const payUrl = URL + "/pay";
  const body = {
    tokenId: cardToken,
    amount: 50,
  };
  return fetch(payUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + userToken,
    },
    body: JSON.stringify(body),
  }).then((response) => {
    if (response.ok) {
    } else throw new Error("HTTP response status not code 200 as expected.");
  });
}

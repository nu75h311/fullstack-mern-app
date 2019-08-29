const authenticate = () => {

  let state = {
    user: {},
    error: null,
    authenticated: false
  };

  // Fetch does not send cookies. So you should add credentials: 'include'
  fetch("http://localhost:4000/auth/login/success", {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true
    }
  })
    .then(response => {
      if (response.status === 200) return response.json();
      throw new Error("Failed to authenticate user");
    })
    .then(responseJson => {
      state.authenticated = true;
      state.user = responseJson.user;
    })
    .catch(error => {
      state.authenticated = false;
      state.error = "Failed to authenticate user";
    });

  return {
    user: state.user,
    authenticated: state.authenticated,
  };
};

export default authenticate;
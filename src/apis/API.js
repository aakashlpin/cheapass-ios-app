var API = {
  getDashboard (email) {
    email = email.toLowerCase().trim();
    return fetch(`https://cheapass.in/api/dashboard/tracks/${email}`)
    .then((response) => response.json());
  },

  requestAppInstallation (data) {
    return fetch(`https://cheapass.in/mobile/register/ios`, {
      credentials: 'same-origin',
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(response => {
      console.log('requestAppInstallation success ', response);
      return response;
    })
    .catch(e => console.log('error hitting /mobile/register/ios ', e));
  }
};

module.exports = API;

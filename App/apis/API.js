var API = {
  getDashboard (email) {
    email = email.toLowerCase().trim();
    return fetch(`https://cheapass.in/api/dashboard/tracks/${email}`)
    .then((response) => response.json());
  }
};

module.exports = API;

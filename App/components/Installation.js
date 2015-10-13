/**
* registers an installation
* data should look like the following:
* {
*  'deviceType': 'ios', // or 'android'
*  // if android is targeted set
*  // 'pushType': 'gcm',
*  // 'GCMSenderId': '56712320625545', // whatever the later means
*  'deviceToken': '29e32a686fd09d053e1616cb48',
*  'channels': [
*       '
*   ]
* };
* for more information visit:
* https://www.parse.com/docs/rest#installations-uploading
*/

const PARSE_APP_ID = 'EnpAUwXNnLdWsPulrCQB1h0Y1ijqkHjFd1N1Ep6Q';
const PARSE_REST_KEY = 'flapt5SCbN0Qf0QfuhBpuEJVtsH828xY8FLSey0M';

var registerInstallation = function(data) {
    var url = 'https://api.parse.com';
    url += '/1/installations';
    fetch(url, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'X-Parse-Application-Id': PARSE_APP_ID,
            'X-Parse-REST-API-Key': PARSE_REST_KEY,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .catch(e => console.log(e));
};

module.exports = registerInstallation;

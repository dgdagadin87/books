
let defaultSettings = {
    'serverHost' : 'localhost',
    'serverPort': 9001,
    'serverProtocol': 'http'
};

let pageSettings = {
    'start' : 1,
    'end': 1,
    'left': 2,
    'right': 2
};

let urlSettings = {
    'getCommonData' : '/common',
    'getMyBooksData': '/mybooks',
    'sendToMail': '/sendtomail/',
    'downloadBook': '/download/',
    'deleteMyBook': '/deletemybook/'
};

export {defaultSettings, pageSettings, urlSettings};
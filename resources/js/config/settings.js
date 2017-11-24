
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
    'getAllBooksData': '/allbooks',
    'getAddBookData': '/addbook',
    'sendToMail': '/sendtomail/',
    'downloadBook': '/download/',
    'addToMyBooks': '/addtomybooks/',
    'deleteMyBook': '/deletebook/',
    'deleteBook': '/deletebook/',
    'addRawBook': '/addrawbook'
};

export {defaultSettings, pageSettings, urlSettings};
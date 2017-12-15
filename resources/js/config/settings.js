
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
    'getCommonData'  : '/common',
    'getMyBooksData' : '/mybooks',
    'getAllBooksData': '/allbooks',
    'getUsersData'   : '/users',
    'getAddBookData' : '/addbook',
    'sendToMail'     : '/sendtomail/',
    'downloadBook'   : '/download/',
    'addToMyBooks'   : '/addtomybooks/',
    'deleteMyBook'   : '/deletebook/',
    'deleteBook'     : '/deletebook/',
    'addRawBook'     : '/addrawbook',
    'downloadRawBook': '/downloadrawbook',
    'addUser'        : '/adduser',
    'getUser'        : '/getuser/',
    'editUser'       : '/edituser/',
    'deleteUser'     : '/deleteuser/'
};

export {defaultSettings, pageSettings, urlSettings};
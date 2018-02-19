
let defaultSettings = {
    'serverHost' : '127.0.0.1',
    'serverPort': 8000,
    'serverProtocol': 'http'
};

let pageSettings = {
    'start' : 1,
    'end': 1,
    'left': 2,
    'right': 2
};

let urlSettings = {
    'getCommonData'  : '/api/common',
    'getMyBooksData' : '/api/mybooks',
    'getAllBooksData': '/api/allbooks',
    'getUsersData'   : '/api/users',
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
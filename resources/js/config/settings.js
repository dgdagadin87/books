
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
    'downloadBook'   : '/api/download/',
    'addToMyBooks'   : '/api/addtomybooks/',
    'deleteMyBook'   : '/api/deletemybook/',
    'deleteBook'     : '/api/deletebook/',
    'addRawBook'     : '/addrawbook',
    'downloadRawBook': '/downloadrawbook',
    'addUser'        : '/api/adduser',
    'getUser'        : '/api/getuser/',
    'editUser'       : '/edituser/',
    'deleteUser'     : '/deleteuser/'
};

export {defaultSettings, pageSettings, urlSettings};
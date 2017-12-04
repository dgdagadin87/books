import $ from 'jquery';

function isEmpty(value){
    if (value === null || value === '' || value === undefined ){
        return true;
    }
    else {
        return false;
    }
};

function emptyFunction () {
    return;
};

function checkEmail (value) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
}

function applyParams (object, config) {
    let property;
    if (object) {
        for (property in config) {
            object[property] = config[property];
        }
    }
    return object;
};

function createUrlLink (settings, url) {
    return settings['serverProtocol'] + '://' + settings['serverHost'] + ':' + settings['serverPort'] + url;
};

function setDocumentTitle (title) {
    $('title').text('Приложение "Книги" - ' + title);
};

function ajaxQuery (config, functions){
    
    let {
        beforeSend = emptyFunction,
        afterSuccess = emptyFunction,
        afterError = emptyFunction,
        afterComplete = emptyFunction
    } = functions;
    
    let callbackParams = arguments[2] || {};
    let {
        beforeSendParams = {},
        afterSuccessParams = {},
        afterErrorParams = {},
        afterCompleteParams = {}
    } = callbackParams;

    let queryConfig = {
        type: 'GET',
        async: true,
        cache: false,
        dataType: 'json',
        headers: {},
        beforeSend: (jqXHR, settings) => {
            beforeSend(jqXHR, settings, beforeSendParams);
        },
        success: (data, textStatus, jqXHR) => {
            let {errorCode = ''} = data;
            let errorCodes = ['NOT_AUTH', 'ACCESS_DENIED'];
            if (errorCodes.indexOf(errorCode) !== -1) {
                window.location.href = '/';
                return false;
            }
            afterSuccess(data, textStatus, jqXHR, afterSuccessParams);
        },
        error: (jqXHR, textStatus, errorThrown) => {
            afterError(jqXHR, textStatus, errorThrown, afterErrorParams);
        },
        complete: (jqXHR, textStatus) => {
            afterComplete(jqXHR, textStatus, afterCompleteParams);
        }
    };
    let cfg = applyParams(config, queryConfig);

    $.ajax(cfg);
}

export {isEmpty, checkEmail, emptyFunction, createUrlLink, applyParams, setDocumentTitle, ajaxQuery};
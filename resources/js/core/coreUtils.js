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

function applyParams (object, config) {
    let property;
    if (object) {
        for (property in config) {
            object[property] = config[property];
        }
    }
    return object;
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
            if (errorCode === 'NOT_AUTH') {
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
    let cfg = this.applyParams(loConf, queryConfig);

    $.ajax(cfg);
}

export {isEmpty, emptyFunction, applyParams, ajaxQuery};
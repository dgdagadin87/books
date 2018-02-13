var functionObject = {
    isEmpty: function(value) {
        return (value === null || value === undefined || value === '') ? true : false;
    },
    clearErrors: function(){
        $('#errors').hide();
    },
    showErrors: function(errors){
        var errorString = '';
        $.each(errors, function(key, error){
            errorString += '<div>'+error+'</div>';
        });
        $('#errors').html(errorString);
        $('#errors').show();
    },
    afterSuccess: function(data, textStatus, jqXHR){
        var success = data.success || false;
        var message = data.message || 'Ошибка';
        if (!success) {
            this.showErrors([message]);
            return false;
        }
        window.location.href = '/';
    },
    afterError: function(jqXHR, textStatus, errorThrown){
        console.log(errorThrown);
        this.showErrors([errorThrown]);
    },
    afterComplete: function(jqXHR, textStatus){
        $('#submit').removeAttr('disabled');
    }
};
$(document).ready(function() {
    $('#submit').click(function(event) {
        event.preventDefault();

        var login = $('#login').val();
        var password = $('#password').val();

        functionObject.clearErrors();

        if (functionObject.isEmpty(login) || functionObject.isEmpty(password)) {
            functionObject.showErrors(['Введите логин и пароль']);
            return false;
        }

        $('#submit').attr('disabled','disabled');

        var queryConfig = {
            url: '/api/login',
            type: 'POST',
            async: true,
            cache: false,
            dataType: 'json',
            data: {
                login: login,
                pass: password
            },
            headers: {},
            success: function(data, textStatus, jqXHR){
                functionObject.afterSuccess(data, textStatus, jqXHR);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                functionObject.afterError(jqXHR, textStatus, errorThrown);
            },
            complete: function(jqXHR, textStatus){
                functionObject.afterComplete(jqXHR, textStatus);
            }
        };
        $.ajax(queryConfig);
    });
    $('#reset').click(function(event) {
        event.preventDefault();
        $('#login').val('');
        $('#password').val('');
    });
});
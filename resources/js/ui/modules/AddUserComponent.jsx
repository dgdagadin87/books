import React from 'react';

import PropTypes from 'prop-types';

import BaseModule from '../../base/BaseModule.jsx';

import {isEmpty, ajaxQuery, createUrlLink as CUL} from '../../core/coreUtils';
import {defaultSettings, urlSettings} from '../../config/settings';

import {getDefaultState} from '../../core/applicationUtils';

import NoAccessModule from '../components/NoAccessComponent.jsx';
import UserFormComponent from '../components/UserFormComponent.jsx';

class AddUserComponent extends BaseModule {

    constructor(props) {
        super(props);
        
        const {globalEvents} = this.props;
        
        this.state = {
            userLogin: '',
            userName: '',
            userIsAdmin: false,
            errorText: '',
            disabled: false
        };

        globalEvents.trigger('setTitle', 'Добавить пользователя');
    }

    componentWillReceiveProps() {}

    _setParentState(state) {
        
        this.setStats(state);
    }

    _renderError() {
        
        const {errorText} = this.state;
        
        if (isEmpty(errorText)) {
            return null;
        }
        
        return (
            <div key={1} className="add-user__error">
                <strong>Ошибка!</strong> {errorText}
            </div>
        );
    }

    _renderNoAccess() {
        
        return (<NoAccessModule />);
    }

    _handleClick() {

        const {history, globalEvents} = this.props;
        const {disabled, userLogin, userName, userIsAdmin} = this.state;

        if (disabled) {
            return;
        }

        this.setStats({
            errorText: '',
            disabled: true
        });
        
        ajaxQuery(
            {
                url: CUL(defaultSettings, urlSettings['addUser']),
                method: 'POST',
                dataType: 'json',
                data: {
                    userLogin: userLogin,
                    userName: userName,
                    userIsAdmin: userIsAdmin
                }
            },
            {
                afterSuccess: (result) => {
                    if (!result.isSuccess) {
                        globalEvents.trigger('showError', result);
                        return;
                    }
                    
                    let {data = {}} = result;
                    
                    if (data.hasError === true) {
                        this.setStats({
                            errorText: data.errorText,
                            disabled: false
                        });
                        return;
                    }
                    
                    this.setStats({
                        disabled: false
                    });
                    
                    alert('Пользователь успешно добавлен.');
                    
                    let defaultUsersData = getDefaultState('users');
                    let callBack = () => {
                        history.push('/users');
                    };
                    
                    globalEvents.trigger('setModuleData', defaultUsersData, 'users', callBack.bind(this));
                },
                afterError: (result) => {
                    globalEvents.trigger('showError', result);
                }
            }
        );
    }
    
    _handleReturn() {

        const {history} = this.props;

        history.push('/users');
    }

    _renderAddUser() {
        
        const {userLogin, userName, userIsAdmin, disabled} = this.state;
        
        let addUserArray = [];
        
        addUserArray.push(this._renderError());
        
        addUserArray.push(
            <div key={0} className="add-user__title">
                Добавление пользователя в систему
            </div>
        );

        addUserArray.push(
            <UserFormComponent
                key={2}
                disabled={disabled}
                userLogin={userLogin}
                userName={userName}
                userIsAdmin={userIsAdmin}
                setParentState={this._setParentState.bind(this)}
            />
        );

        addUserArray.push(
            <div key={3} className="user-form__row buttons">
                <button
                    className="user-form__button"
                    disabled={disabled || isEmpty(userLogin) || isEmpty(userName)}
                    onClick={this._handleClick.bind(this)}
                >
                    Добавить
                </button>
                <button
                    className="user-form__button"
                    disabled={disabled}
                    onClick={this._handleReturn.bind(this)}
                >
                    Вернуться
                </button>
            </div>
        );

        return addUserArray;
    }

    render() {

        const {serverData} = this.props;
        const {user} = serverData;

        return (
            <div className="add-user__container">
                {user.userIsAdmin ? this._renderAddUser() : this._renderNoAccess()}
            </div>
        );
    }
};

AddUserComponent.propTypes = {
    serverData: PropTypes.object.isRequired,
    globalEvents:  PropTypes.object.isRequired
};

export default AddUserComponent;
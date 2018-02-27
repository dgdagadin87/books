import React from 'react';

import PropTypes from 'prop-types';

import BaseModule from '../../base/BaseModule.jsx';

import {isEmpty, ajaxQuery, createUrlLink as CUL} from '../../core/coreUtils';
import {defaultSettings, urlSettings} from '../../config/settings';

import {getDefaultState} from '../../core/applicationUtils';

import NoAccessModule from '../components/NoAccessComponent.jsx';
import UserFormComponent from '../components/UserFormComponent.jsx';

class EditUserComponent extends BaseModule {

    constructor(props) {
        super(props);
        
        const {globalEvents} = this.props;
        
        this.state = {
            userId: null,
            userLogin: '',
            userName: '',
            userIsAdmin: false,
            errorText: '',
            disabled: false,
            isLoaded: false
        };

        globalEvents.trigger('setTitle', 'Редактировать пользователя');
    }

    componentWillReceiveProps() {}

    componentDidMount() {
        super.componentDidMount();

        const {match, globalEvents} = this.props;
        const {params} = match;
        const {id} = params;
        
        this.setStats({
            disabled: true
        });
        
        ajaxQuery(
            {
                url: CUL(defaultSettings, urlSettings['getUser'] + id),
                method: 'GET'
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
                        disabled: false,
                        isLoaded: true,
                        userId: data.userId,
                        userLogin: data.userLogin,
                        userName: data.userName,
                        userIsAdmin: data.userIsAdmin
                    });
                },
                afterError: (result) => {
                    globalEvents.trigger('showError', result);
                }
            }
        );
    }

    _setParentState(state) {
        
        this.setStats(state);
    }

    _renderNoAccess() {
        
        return (<NoAccessModule />);
    }

    _handleClick() {

        const {history, globalEvents} = this.props;
        const {disabled, userLogin, userId, userName, userIsAdmin} = this.state;

        if (disabled) {
            return;
        }

        this.setStats({
            errorText: '',
            disabled: true
        });
        
        ajaxQuery(
            {
                url: CUL(defaultSettings, urlSettings['editUser']) + userId,
                method: 'POST',
                dataType: 'json',
                data: {
                    userId: userId,
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
                    
                    alert('Пользователь "' + userLogin + '" успешно отредактирован.');
                    
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
    
    _handleReturn() {

        const {history} = this.props;

        history.push('/users');
    }

    _renderEditUser() {
        
        const {userLogin, userName, userIsAdmin, disabled} = this.state;
        
        let editUserArray = [];
        
        editUserArray.push(this._renderError());
        
        editUserArray.push(
            <div key={0} className="add-user__title">
                Редактирование пользователя
            </div>
        );

        editUserArray.push(
            <UserFormComponent
                key={2}
                disabled={disabled}
                mode={'edit'}
                userLogin={userLogin}
                userName={userName}
                userIsAdmin={userIsAdmin}
                setParentState={this._setParentState.bind(this)}
            />
        );

        editUserArray.push(
            <div key={3} className="user-form__row buttons">
                <button
                    className="user-form__button"
                    disabled={disabled || isEmpty(userLogin) || isEmpty(userName)}
                    onClick={this._handleClick.bind(this)}
                >
                    Редактировать
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

        return editUserArray;
    }

    render() {

        const {serverData} = this.props;
        const {user} = serverData;

        return (
            <div className="add-user__container">
                {user.userIsAdmin ? this._renderEditUser() : this._renderNoAccess()}
            </div>
        );
    }
};

EditUserComponent.propTypes = {
    serverData: PropTypes.object.isRequired,
    globalEvents:  PropTypes.object.isRequired
};

export default EditUserComponent;
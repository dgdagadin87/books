import React from 'react';

import BaseComponent from '../../base/BaseComponent.jsx';

import MenuLink from '../components/MenuLinkComponent.jsx';

export default class HeaderComponent extends BaseComponent {

    componentWillReceiveProps(props) {
    }

    render() {

        return (
            <menu>
                <ul>
                    <li><MenuLink activeOnlyWhenExact={true} to="/" label="Мои книги" /></li>
                    <li><MenuLink to="/allbooks" label="Все книги" /></li>
                    <li><MenuLink to="/addbook" label="Добавить книгу" /></li>
                    <li><MenuLink to="/about" label="О программе" /></li>
                </ul>
            </menu>
        );
    }
}
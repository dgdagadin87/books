import React from 'react';

import BaseComponent from '../../base/BaseComponent.jsx';

import {NavLink} from 'react-router-dom';

export default class HeaderComponent extends BaseComponent {

	componentWillReceiveProps(props) {
	}

    render() {

        return (
            <menu>
				<ul>
					<li><NavLink activeClassName="active" to="/">Мои книги</NavLink></li>
					<li><NavLink activeClassName="active" to="/allbooks">Все книги</NavLink></li>
					<li><NavLink activeClassName="active" to="/addbook">Добавить книгу</NavLink></li>
					<li><NavLink activeClassName="active" to="/about">О программе</NavLink></li>
				</ul>
			</menu>
        );
    }
}
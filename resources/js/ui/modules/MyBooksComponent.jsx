import React from 'react';

import BaseComponent from '../../base/BaseComponent.jsx';

export default class MyBooksComponent extends BaseComponent {

    componentWillReceiveProps(props) {
    }

    render() {

        return (
            <div>
                Мои книги
            </div>
        );
    }
}
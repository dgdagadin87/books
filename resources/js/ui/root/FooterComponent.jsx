import React from 'react';

import BaseComponent from '../../base/BaseComponent.jsx';

export default class FooterComponent extends BaseComponent {

    componentWillReceiveProps(props) {
    }

    render() {

        let footerCurYear = new Date().getFullYear();

        return (
            <div className="main-footer">
                <div className="under-footer">
                    <div className="left-one">
                        <div>
                            <a target="_blank" href="https://github.com/dgdagadin87/books/">Репозиторий</a> проекта
                        </div>
                    </div>
                    <div className="center-one">
                        Версия <strong>0.0.1</strong> &copy;
                    </div>
                    <div className="right-one">
                        <div>
                            {footerCurYear} год
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
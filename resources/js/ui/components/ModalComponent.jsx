import React from 'react';

import PropTypes from 'prop-types';

import $ from 'jquery';
import 'jquery-ui/ui/widgets/dialog';

import {isEmpty, ajaxQuery, createUrlLink as CUL} from '../../core/coreUtils';
import {defaultSettings, urlSettings} from '../../config/settings';

import BaseComponent from '../../base/BaseComponent.jsx';

class ModalComponent extends BaseComponent {

    constructor(props) {
        super(props);

        this.state = {
            mode: 'addbook',
            step: 'start'
        };
        this._bindEvents();
    }

    _bindEvents() {
        
        const {events} = this.props;
        
        events.on('addInMyBooks', (step) => this._addInMyBooks(step));
        events.on('downloadRawBook', (step, bookId) => this._downloadRawBook(step, bookId));
    }

    _addInMyBooks(step) {

        let title = 'Добавление в "Мои книги"';

        let stateCallback = () => {
            $('#addNewBook_modal').dialog('option', 'title', title);
            $('#addNewBook_modal').dialog('open');
        };

        this.setStats({
            mode: 'addbook',
            step: step,
            bookId: null
        }, stateCallback.bind(this));
    }
    
    _downloadRawBook(step, bookId) {

        let title = 'Скачивание книги';

        let stateCallback = () => {
            $('#addNewBook_modal').dialog('option', 'title', title);
            $('#addNewBook_modal').dialog('open');
        };

        this.setStats({
            mode: 'downloadbook',
            step: step,
            bookId: bookId
        }, stateCallback.bind(this));
    }

     _downloadHandler(event) {
        
        event.preventDefault();
        
        const {bookId} = this.state;
        
        window.location.href = '/downloadrawbook/' + bookId;
    }

    _closeHandler() {
        $('#addNewBook_modal').dialog('close');
    }

    componentWillReceiveProps(nextProps) {

        this.setStats({
            mode: nextProps.mode,
            step: nextProps.step
        });
    }

    componentDidMount() {
        
        super.componentDidMount();
        setTimeout(() => {
            $('#addNewBook_modal').dialog({
                autoOpen: false,
                modal: true,
                draggable: false
            });
        }, 300);
    }

    _renderContent() {
        
        const {mode, step} = this.state;
        
        if (mode === 'addbook') {
            if (step === 'start') {
                return (
                    <div className="main-addnewbook__modal-start">
                        Идет добавление книги...<br />
                        Это может занять некоторое время.
                        Пожалуйста, не закрывайте браузер.
                    </div>
                );
            }
            else {
                return (
                    <div className="main-addnewbook__modal-end">
                        Книга успешно добавлена в "Мои книги".
                        <div>
                            <button
                                onClick={this._closeHandler.bind(this)}
                            >
                                Закрыть окно
                            </button>
                        </div>
                    </div>
                );
            }
        }
        
        if (mode === 'downloadbook') {
            if (step === 'start') {
                return (
                    <div className="main-addnewbook__modal-start">
                        Идет формирование файла книги для скачивания...<br />
                        Это может занять некоторое время.
                        Пожалуйста, не закрывайте браузер.
                    </div>
                );
            }
            else {
                return (
                    <div className="main-addnewbook__modal-end">
                        <a
                            href="#"
                            className="main-addnewbook__modal-link"
                            onClick={this._downloadHandler.bind(this)}
                        >
                            Скачать книгу
                        </a>
                        <div>
                            <button
                                onClick={this._closeHandler.bind(this)}
                            >
                                Закрыть окно
                            </button>
                        </div>
                    </div>
                );
            }
        }
    }

    render() {

        return (
            <div
                style={{display:'none'}}
                id="addNewBook_modal"
                className="main-addnewbook__modal-container"
            >
                {this._renderContent()}
            </div>
        );
    }
};

ModalComponent.propTypes = {
    events: PropTypes.object.isRequired
};

export default ModalComponent;
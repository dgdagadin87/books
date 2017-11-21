import React from 'react';

import PropTypes from 'prop-types';

import $ from 'jquery';
import 'jquery-ui/ui/widgets/dialog';

import BaseComponent from '../../base/BaseComponent.jsx';

class ModalComponent extends BaseComponent {

    constructor(props) {
        super(props);

        this.state = {
            mode: props.mode,
            step: 'first'
        };
        this._bindEvents();
    }

    _bindEvents() {
        
        const {events} = this.props;
        
        events.on('addInMyBooks', (bookData) => this._addInMyBooks(bookData));
    }

    _addInMyBooks(bookData) {
        window.console.log(bookData);
        $('#addNewBook_modal').dialog('option', 'title', 'New title');
        $('#addNewBook_modal').dialog('open');
    }

    _closeHandler() {
        $('#addNewBook_modal').dialog('close');
        console.log('qwerty');
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

    render() {
        
        const {mode, step} = this.state;

        return (
            <div
                style={{display:'none'}}
                id="addNewBook_modal"
                className="main-addnewbook__modal-container"
            >
                <div>{mode}</div>
                <div>{step}</div>
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
};

ModalComponent.propTypes = {
    events: PropTypes.object.isRequired,
    mode: PropTypes.string.isRequired,
    step: PropTypes.string.isRequired
};

export default ModalComponent;
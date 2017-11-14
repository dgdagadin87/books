import React from 'react';

import PropTypes from 'prop-types';

import $ from 'jquery';
import 'jquery-ui';

import BaseComponent from '../../base/BaseComponent.jsx';

class ModalComponent extends BaseComponent {

    constructor(props) {
        super(props);
        
        this.state = {
            mode: props.mode,
            step: 'first'
        };
    }

    componentWillReceiveProps(nextProps) {

        this.setStats({
            mode: nextProps.mode,
            step: nextProps.step
        });
    }

    componentDidMount() {
        
        super.componentDidMount();
        $('#addNewBook_modal').dialog({
            autoOpen: false
        });
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